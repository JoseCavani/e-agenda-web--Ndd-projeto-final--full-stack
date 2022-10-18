import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';
import { Title } from '@angular/platform-browser';
import { ContatoService } from '../services/contato.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styles: [
  ]
})
export class EditarContatoComponent implements OnInit {

  public formContato: FormGroup;

  public contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService
  ) {
    titulo.setTitle('Editar Contato - e-Agenda');
  }

  ngOnInit(): void {
  this.contatoFormVM = this.route.snapshot.data['contato'];

  this.formContato = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    empresa: [''],
    cargo: ['']
  });

  this.formContato.patchValue({
    id: this.contatoFormVM.id,
    nome: this.contatoFormVM.nome,
    email: this.contatoFormVM.email,
    telefone: this.contatoFormVM.telefone,
    empresa: this.contatoFormVM.empresa,
    cargo: this.contatoFormVM.cargo,
  });
}

get nome() {
  return this.formContato.get('nome');
}
get email() {
  return this.formContato.get('email');
}get telefone() {
  return this.formContato.get('telefone');
}get empresa() {
  return this.formContato.get('empresa');
}get cargo() {
  return this.formContato.get('cargo');
}
public gravar() {
  if (this.formContato.invalid) return;

  this.contatoFormVM = Object.assign({}, this.contatoFormVM, this.formContato.value);

  this.contatoService.editar(this.contatoFormVM)
    .subscribe({
      next: (contatoInserido) => this.processarSucesso(contatoInserido),
      error: (erro) => this.processarFalha(erro)
    })
}
 private processarSucesso(contato: FormsContatoViewModel): void {
  this.router.navigate(['/contatos/listar']);
}

private processarFalha(erro: any) {
  if (erro) {
    console.error(erro);
  }
}

}
