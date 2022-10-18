import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { VisualizarDespesaViewModel } from "../view-models/visualizar-despesa.view-model";
import { DespesaService } from "./despesa.service";

@Injectable()
export class VisualizarDespesaResolver implements Resolve<VisualizarDespesaViewModel> {

  constructor(private  despesaService: DespesaService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<VisualizarDespesaViewModel> {
    return this.despesaService.selecionarDespesaCompletaPorId(route.params['id']);
  }
}
