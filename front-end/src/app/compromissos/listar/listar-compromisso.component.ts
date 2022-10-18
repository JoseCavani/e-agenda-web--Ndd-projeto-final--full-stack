import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompromissoService } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../view-models/listar-compromisso.view-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-compromisso',
  templateUrl: './listar-compromisso.component.html',
})
export class ListarCompromissoComponent implements OnInit {



  public compromissos$: Observable<ListarCompromissoViewModel[]>;
dataHoje: any;


dataFutura: any;


  constructor(private compromissoService: CompromissoService) { }

  ngOnInit(): void {
    this.compromissos$ = this.compromissoService.selecionarTodos();
  }

  ListarFuturos() {
    this.compromissos$ = this.compromissoService.selecionarFuturo(this.dataHoje,this.dataFutura);
    }
    ListarPassados() {
      this.compromissos$ = this.compromissoService.selecionarPassados();
    }
}
