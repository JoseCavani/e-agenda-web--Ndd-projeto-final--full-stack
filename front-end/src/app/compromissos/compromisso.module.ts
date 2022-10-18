import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CompromissoRoutingModule } from './compromisso-routing.module';
import { CompromissoAppComponent } from './compromisso-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { CompromissoService } from './services/compromisso.service';
import { CompromissoInserirComponent } from './inserir/compromisso-inserir.component';
import { ContatoService } from '../contatos/services/contato.service';
import { EditarCompromissoComponent } from './editar/editar-compromisso.component';
import { FormsCompromissoResolver } from './services/forms-compromisso.resolver';
import { ExcluirCompromissoComponent } from './excluir/excluir-compromisso.component';


@NgModule({
  declarations: [
    CompromissoAppComponent,
    ListarCompromissoComponent,
    CompromissoInserirComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent,
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [CompromissoService,ContatoService,FormsCompromissoResolver,DatePipe]
})
 export class CompromissoModule { }
