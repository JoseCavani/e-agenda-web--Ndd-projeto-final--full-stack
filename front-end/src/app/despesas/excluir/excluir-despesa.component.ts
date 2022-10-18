import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from '../services/despesa.service';
import { VisualizarDespesaViewModel } from '../view-models/visualizar-despesa.view-model';

@Component({
  selector: 'app-excluir-despesa',
  templateUrl: './excluir-despesa.component.html',
  styles: [
  ]
})
export class ExcluirDespesaComponent implements OnInit {

  public despesaFormVM: VisualizarDespesaViewModel = new VisualizarDespesaViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService
  ) {
    titulo.setTitle('Excluir Despesa - e-Agenda');
  }

  ngOnInit(): void {
    this.despesaFormVM = this.route.snapshot.data['despesa'];
  }

  public gravar() {

    this.despesaService.excluir(this.despesaFormVM.id)
      .subscribe({
        next: (tarefaId) => this.processarSucesso(tarefaId),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefaId: string): void {
    this.router.navigate(['/despesas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }

}
