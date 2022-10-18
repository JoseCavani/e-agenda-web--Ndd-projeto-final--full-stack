import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaService } from '../service/categoria.service';
import { FormsCategoriaViewModel } from '../view-models/forms-categoria.view-model';
import { ListarCategoriaViewModel } from '../view-models/listar-tarefa.view-model';

@Component({
  selector: 'app-categoria-inserir',
  templateUrl: './categoria-inserir.component.html'
})
export class CategoriaInserirComponent implements OnInit {
  public categorias$: Observable<ListarCategoriaViewModel[]>;

  public formCategoria: FormGroup;
  public categoriaFormVM: FormsCategoriaViewModel = new FormsCategoriaViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar Categoria - e-Agenda');
  }

  ngOnInit(): void {

    this.formCategoria = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get titulo() {
    return this.formCategoria.get('titulo');
  }

  public gravar() {
    if (this.formCategoria.invalid) return;

    this.categoriaFormVM = Object.assign({}, this.categoriaFormVM, this.formCategoria.value);

    this.categoriaService.inserir(this.categoriaFormVM)
      .subscribe({
        next: (categoriaInserida) => this.processarSucesso(categoriaInserida),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefa: FormsCategoriaViewModel): void {
    this.router.navigate(['/categorias/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }
}
