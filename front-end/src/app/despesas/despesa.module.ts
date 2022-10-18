import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesaRoutingModule } from './despesa-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarDespesaComponent } from './listar/listar-despesa.component';
import { InserirDespesaComponent } from './inserir/despesa-inserir.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DespesaComponent } from './despesa.component'
import { DespesaService } from './services/despesa.service';
import { FormsDespesaResolver } from './services/forms-despesa.resolver';
import { VisualizarDespesaResolver } from './services/visualizar-despesa.resolver';
import { CategoriaService } from '../categorias/service/categoria.service';
import { EditarDespesaComponent } from './editar/editar-despesa.component';
import { ExcluirDespesaComponent } from './excluir/excluir-despesa.component';


@NgModule({
  declarations: [
    DespesaComponent,
    ListarDespesaComponent,
    InserirDespesaComponent,
    EditarDespesaComponent,
    ExcluirDespesaComponent
  ],
  imports: [
    CommonModule,
    DespesaRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [DespesaService, FormsDespesaResolver, VisualizarDespesaResolver,CategoriaService]
})
export class DespesaModule { }
