import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { ListarCategoriaComponent } from './listar/listar-categoria.component';
import { CategoriaInserirComponent } from './inserir/categoria-inserir.component';
import { CategoriaService } from './service/categoria.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditarCategoriaComponent } from './editar/editar-categoria.component';
import { FormsCategoriaResolver } from './service/forms-categoria.resolver';
import { ExcluirCategoriaComponent } from './excluir/excluir-categoria.component';


@NgModule({
  declarations: [
    CategoriaComponent,
    ListarCategoriaComponent,
    CategoriaInserirComponent,
    EditarCategoriaComponent,
    ExcluirCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,

    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [CategoriaService,FormsCategoriaResolver]
})
export class CategoriaModule { }
