import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../service/categoria.service';
import { FormsCategoriaViewModel } from '../view-models/forms-categoria.view-model';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
})
export class ExcluirCategoriaComponent implements OnInit {

  public categoriaFormVM: FormsCategoriaViewModel = new FormsCategoriaViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    titulo.setTitle('Excluir Categoria - e-Agenda');
  }

  ngOnInit(): void {
    this.categoriaFormVM = this.route.snapshot.data['categoria'];
  }

  public gravar() {

    this.categoriaService.excluir(this.categoriaFormVM.id)
      .subscribe({
        next: (categoriaId) => this.processarSucesso(categoriaId),
        error: (erro) => this.processarFalha(erro)
      })
  }


  private processarSucesso(categoriaId: string): void {
    this.router.navigate(['/categorias/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }


}
