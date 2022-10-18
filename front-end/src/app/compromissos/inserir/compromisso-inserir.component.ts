import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { FormsContatoViewModel } from 'src/app/contatos/view-models/forms-contato.view-model';
import { CompromissoService } from '../services/compromisso.service';
import { ListarContatoViewModel } from '../../contatos/view-models/listar-contato.view-model';
import { TipoLocalCompromissoEnum } from 'src/app/contatos/view-models/tipo-local-compromisso.enum';
import { FormsCompromissoViewModel } from '../view-models/Form-compromisso.view-model';
import * as moment from 'moment';

@Component({
  selector: 'app-compromisso-inserir',
  templateUrl: './compromisso-inserir.component.html'
})
export class CompromissoInserirComponent implements OnInit {
  public contatos$: Observable<ListarContatoViewModel[]>;
  public formCompromisso: FormGroup;
  public compromissoFormVM: FormsCompromissoViewModel = new FormsCompromissoViewModel();

  public tipoLocais = Object.values(TipoLocalCompromissoEnum)
    .filter(v => !Number.isFinite(v));


  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private compromissoService: CompromissoService,
    private contatoService: ContatoService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar Categoria - e-Agenda');
  }

  ngOnInit(): void {


    this.contatos$ = this.contatoService.selecionarTodos();

    this.formCompromisso = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      local: [''],
      tipoLocal: ['', [Validators.required]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      link: [''],
      contatoId: ['', [Validators.required]],

    });
  }
  get assunto() {
    return this.formCompromisso.get('assunto');
  }

  get local() {
    return this.formCompromisso.get('local');
  }
  get tipoLocal() {
    return this.formCompromisso.get('tipoLocal');
  }
  get data() {
    return this.formCompromisso.get('data');
  }
  get horaInicio() {
    return this.formCompromisso.get('horaInicio');
  }
  get horaTermino() {
    return this.formCompromisso.get('horaTermino');
  }
  get link() {
    return this.formCompromisso.get('link');
  }
  get contato() {
    return this.formCompromisso.get('contato');
  }
  public DisabilitarOuHabilitarLinkELocal() {
    if (this.tipoLocal!.value === TipoLocalCompromissoEnum.Presencial || this.tipoLocal!.value === 1) {
      this.local!.enable();
      this.link!.disable();
      this.link!.patchValue("")
      this.local!.addValidators(Validators.required)
      this.link!.removeValidators(Validators.required)
      this.local!.reset()
    }
    else {
      this.local!.disable();
      this.local!.patchValue("");
      this.link!.enable();
      this.link!.addValidators(Validators.required)
      this.local!.removeValidators(Validators.required)
      this.link!.reset()
    }
  }
  public gravar() {
    if (this.formCompromisso.invalid) return;


    this.horaInicio!.patchValue(this.horaInicio?.value + ":00");
    this.horaTermino!.patchValue(this.horaTermino?.value + ":00");

    this.compromissoFormVM = Object.assign({}, this.compromissoFormVM, this.formCompromisso.value);

    this.compromissoService.inserir(this.compromissoFormVM)
      .subscribe({
        next: (compromissoInserida) => this.processarSucesso(compromissoInserida),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefa: FormsCompromissoViewModel): void {
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }
}
