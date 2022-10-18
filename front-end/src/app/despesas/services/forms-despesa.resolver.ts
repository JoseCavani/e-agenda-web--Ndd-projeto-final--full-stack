import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { map, Observable } from "rxjs";
import { FormsDespesaViewModel } from "../view-models/forms-despesa.view-model";
import { DespesaService } from "./despesa.service";
@Injectable()
export class FormsDespesaResolver implements Resolve<FormsDespesaViewModel> {

  constructor(private compromissoService: DespesaService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsDespesaViewModel> {
    return this.compromissoService.selecionarPorId(route.params['id']);
  }
}
