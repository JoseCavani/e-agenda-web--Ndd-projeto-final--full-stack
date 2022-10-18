import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/categorias/service/categoria.service';
import { ListarCategoriaViewModel } from 'src/app/categorias/view-models/listar-tarefa.view-model';
import { DespesaService } from '../services/despesa.service';
import { CategoriaSelecionadaViewModel } from '../view-models/categoria-selecionada.view-model';
import { FormaPgtoDespesaEnum } from '../view-models/FormaPgtoDespesa.Enum';
import { FormsDespesaViewModel } from '../view-models/forms-despesa.view-model';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styles: [
  ]
})
export class EditarDespesaComponent implements OnInit,AfterViewInit {


  public categoriaBox: HTMLSelectElement;
  public isShown: boolean = false
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    titulo.setTitle('Editar Despesa - e-Agenda');
  }

  ngAfterViewInit() {
    this.categoriaBox = document.getElementById("categoriaBox") as HTMLSelectElement
  }

  ngOnInit(): void {

this.categoriaBox;

    this.despesaFormVM = this.route.snapshot.data['despesa'];

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

    this.formDespesa.patchValue({
      id: this.despesaFormVM.id,
      descricao: this.despesaFormVM.descricao,
      valor: this.despesaFormVM.valor,
      data: this.despesaFormVM.data.toString().split('T')[0],
      formaPagamento: this.despesaFormVM.formaPagamento,
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
      this.categoriaBox!.classList.remove('is-invalid')

      if(this.despesaFormVM.categoriasSelecionadas.find(x => x.id === this.categoriaAtual.id) != undefined){
        this.categoriaBox!.classList.add('is-invalid')
      return;
      }

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

    this.despesaService.editar(this.despesaFormVM)
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
