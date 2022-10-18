import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { map, Observable } from "rxjs";
import { FormsCategoriaViewModel } from "../view-models/forms-categoria.view-model";
import { CategoriaService } from "./categoria.service";
@Injectable()
export class FormsCategoriaResolver implements Resolve<FormsCategoriaViewModel> {

  constructor(private compromissoService: CategoriaService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsCategoriaViewModel> {
    return this.compromissoService.selecionarPorId(route.params['id']);
  }
}
