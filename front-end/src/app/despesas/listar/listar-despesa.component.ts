import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DespesaService } from '../services/despesa.service';
import { ListarDespesaViewModel } from '../view-models/listar-despesa.view-model';

@Component({
  selector: 'app-listar-despesa',
  templateUrl: './listar-despesa.component.html',
})
export class ListarDespesaComponent implements OnInit {
  public despesas$: Observable<ListarDespesaViewModel[]>;

  constructor(private despesaService: DespesaService) { }

  ngOnInit(): void {
    this.despesas$ = this.despesaService.selecionarTodos();
  }

}
