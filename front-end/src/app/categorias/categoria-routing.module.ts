import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { CategoriaComponent } from './categoria.component';
import { EditarCategoriaComponent } from './editar/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir/excluir-categoria.component';
import { CategoriaInserirComponent } from './inserir/categoria-inserir.component';
import { ListarCategoriaComponent } from './listar/listar-categoria.component';
import { FormsCategoriaResolver } from './service/forms-categoria.resolver';

const routes: Routes = [{
  path: '', component: CategoriaComponent,
  canActivate: [AuthGuard],
 children: [
   { path: '', redirectTo: 'listar', pathMatch: 'full' },
   { path: 'listar', component: ListarCategoriaComponent },
   { path: 'inserir', component: CategoriaInserirComponent},
   {
     path: 'editar/:id',
     component: EditarCategoriaComponent,
     resolve: { categoria: FormsCategoriaResolver }
   },
   {
     path: 'excluir/:id',
     component: ExcluirCategoriaComponent,
     resolve: { categoria: FormsCategoriaResolver }
   }
 ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
