import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaService } from '../service/categoria.service';
import { ListarCategoriaViewModel } from '../view-models/listar-tarefa.view-model';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styles: [
  ]
})
export class ListarCategoriaComponent implements OnInit {
  public categorias$: Observable<ListarCategoriaViewModel[]>;
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();
  }

}
