import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CategoriaService } from "src/app/categorias/service/categoria.service";
import { FormsCategoriaViewModel } from "src/app/categorias/view-models/forms-categoria.view-model";
import { ListarCategoriaViewModel } from "src/app/categorias/view-models/listar-tarefa.view-model";
import { DespesaService } from "../services/despesa.service";
import { CategoriaSelecionadaViewModel } from "../view-models/categoria-selecionada.view-model";
import { FormaPgtoDespesaEnum } from "../view-models/FormaPgtoDespesa.Enum";
import { FormsDespesaViewModel } from "../view-models/forms-despesa.view-model";


@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './despesa-inserir.component.html'
})
export class InserirDespesaComponent implements OnInit {
  public formDespesa: FormGroup;
  public formCategoria: FormGroup;
  public formasPagamento = Object.values(FormaPgtoDespesaEnum)
    .filter(v => !Number.isFinite(v));

  public despesaFormVM: FormsDespesaViewModel = new FormsDespesaViewModel();
  public categorias$: Observable<ListarCategoriaViewModel[]>;

  public categoriaAtual : ListarCategoriaViewModel;

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar Despesa - e-Agenda');
  }

  ngOnInit(): void {


    this.categorias$ = this.categoriaService.selecionarTodos();

    this.formDespesa = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      formaPagamento: ['', [Validators.required]],
    });

    this.formCategoria = this.formBuilder.group({
      titulo: [''],
    });

  }

  get descricao() {
    return this.formDespesa.get('descricao');
  }
  get valor() {
    return this.formDespesa.get('valor');
  }
  get data() {
    return this.formDespesa.get('data');
  }
  get formaPagamento() {
    return this.formDespesa.get('formaPagamento');
  }

  get tituloCategoria() {
    return this.formCategoria.get('tituloCategoria');
  }

  get titulo() {
    return this.formCategoria.get('titulo');
  }

  public adicionarCategoria(): void {
   {
      let categoria = new CategoriaSelecionadaViewModel();
      categoria.id = this.categoriaAtual.id
      categoria.titulo = this.categoriaAtual.titulo
      categoria.selecionada = true;

      this.despesaFormVM.categoriasSelecionadas.push(categoria);

      this.formCategoria.reset();
    }
  }

  public removerCategoria(categoria: CategoriaSelecionadaViewModel): void {
    this.despesaFormVM.categoriasSelecionadas.forEach((x, index) => {
      if (x === categoria)
        this.despesaFormVM.categoriasSelecionadas.splice(index, 1);
    })
  }

  public gravar() {
    if (this.formDespesa.invalid) return;

    this.despesaFormVM = Object.assign({}, this.despesaFormVM, this.formDespesa.value);

    this.despesaService.inserir(this.despesaFormVM)
      .subscribe({
        next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefa: FormsDespesaViewModel): void {
    this.router.navigate(['/despesas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }
}
