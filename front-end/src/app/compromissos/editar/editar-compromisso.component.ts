import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { ListarContatoViewModel } from 'src/app/contatos/view-models/listar-contato.view-model';
import { TipoLocalCompromissoEnum } from 'src/app/contatos/view-models/tipo-local-compromisso.enum';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../view-models/Form-compromisso.view-model';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styles: [
  ]
})
export class EditarCompromissoComponent implements OnInit {

  public contatos$: Observable<ListarContatoViewModel[]>;
  public formCompromisso: FormGroup;
  public compromissoFormVM: FormsCompromissoViewModel = new FormsCompromissoViewModel();

  public tipoLocais = Object.values(TipoLocalCompromissoEnum)
  .filter(v => !Number.isFinite(v));

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
    private compromissoService: CompromissoService,
  ) {
    titulo.setTitle('Editar Compromisso - e-Agenda');
  }

  ngOnInit(): void {

    this.compromissoFormVM = this.route.snapshot.data['compromisso'];

    this.contatos$ = this.contatoService.selecionarTodos();

    this.formCompromisso = this.fb.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      local: [''],
      tipoLocal: ['', [Validators.required]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      link: [''],
      contatoId: ['', [Validators.required]],

    });



    this.tipoLocal!.patchValue(this.compromissoFormVM.tipoLocal)
    this.DisabilitarOuHabilitarLinkELocal();


    this.formCompromisso.patchValue({
      id: this.compromissoFormVM.id,
      assunto: this.compromissoFormVM.assunto,
      local: this.compromissoFormVM.local,
      data: this.compromissoFormVM.data.toString().split("T")[0],
      horaInicio: this.compromissoFormVM.horaInicio,
      horaTermino: this.compromissoFormVM.horaTermino,
      link: this.compromissoFormVM.link,
      contatoId: this.compromissoFormVM.contato?.id
    });


  }
  public DisabilitarOuHabilitarLinkELocal() {
    if (this.tipoLocal!.value === "Presencial" || this.tipoLocal!.value === 1) {
      this.tipoLocal?.patchValue(1)

      var local = this.local?.value;

      this.local!.enable();
      this.link!.disable();
      this.link!.patchValue("")
      this.local!.addValidators(Validators.required)
      this.link!.removeValidators(Validators.required)
      this.local!.reset()

      this.local?.patchValue(local)

    }
    else if (this.tipoLocal!.value === "Remoto" || this.tipoLocal!.value === 0){
      this.tipoLocal?.patchValue(0)

      var link = this.link?.value;

      this.local!.disable();
      this.local!.patchValue("");
      this.link!.enable();
      this.link!.addValidators(Validators.required)
      this.local!.removeValidators(Validators.required)
      this.link!.reset()

      this.link?.patchValue(link);
    }
    else return
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


  public gravar() {
    if (this.formCompromisso.invalid) return;


    if(this.horaInicio?.touched)
    this.horaInicio!.patchValue(this.horaInicio?.value + ":00");
    if(this.horaTermino?.touched)
    this.horaTermino!.patchValue(this.horaTermino?.value + ":00");

    this.compromissoFormVM = Object.assign({}, this.compromissoFormVM, this.formCompromisso.value);


    this.compromissoService.editar(this.compromissoFormVM)
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
