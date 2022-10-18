import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { CompromissoAppComponent } from './compromisso-app.component';
import { EditarCompromissoComponent } from './editar/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir/excluir-compromisso.component';
import { CompromissoInserirComponent } from './inserir/compromisso-inserir.component';
 import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { FormsCompromissoResolver } from './services/forms-compromisso.resolver';

const routes: Routes = [{
 path: '', component: CompromissoAppComponent,
   canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
    { path: 'listar', component: ListarCompromissoComponent },
    { path: 'inserir', component: CompromissoInserirComponent},
    {
      path: 'editar/:id',
      component: EditarCompromissoComponent,
      resolve: { compromisso: FormsCompromissoResolver }
    },
    {
      path: 'excluir/:id',
      component: ExcluirCompromissoComponent,
      resolve: { compromisso: FormsCompromissoResolver }
    }
  ]
 }];

 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class CompromissoRoutingModule { }
