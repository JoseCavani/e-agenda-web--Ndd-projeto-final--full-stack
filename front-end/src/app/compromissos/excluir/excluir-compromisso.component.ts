import { Component, OnInit } from '@angular/core';
import { FormsCompromissoViewModel } from '../view-models/Form-compromisso.view-model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CompromissoService } from '../services/compromisso.service';


@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styles: [
  ]
})
export class ExcluirCompromissoComponent implements OnInit {
  public compromissoFormVM: FormsCompromissoViewModel = new FormsCompromissoViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService
  ) {
    titulo.setTitle('Excluir Contato - e-Agenda');
  }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso'];
  }

  public gravar() {

    this.compromissoService.excluir(this.compromissoFormVM.id)
      .subscribe({
        next: (compromissoId) => this.processarSucesso(compromissoId),
        error: (erro) => this.processarFalha(erro)
      })
  }


  private processarSucesso(contatoId: string): void {
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }


}
