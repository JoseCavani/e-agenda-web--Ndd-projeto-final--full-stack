import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { map, Observable } from "rxjs";
import { FormsContatoViewModel } from "../view-models/forms-contato.view-model";
import { ContatoService } from "./contato.service";

@Injectable()
export class FormsContatoResolver implements Resolve<FormsContatoViewModel> {

  constructor(private contatoService: ContatoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsContatoViewModel> {
    return this.contatoService.selecionarPorId(route.params['id']);
  }
}
