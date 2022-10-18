import { Timestamp } from "rxjs"
import { FormsContatoViewModel } from "src/app/contatos/view-models/forms-contato.view-model"

export class ListarCompromissoViewModel{
  id: string
  data:Date
  tipoLocal: string
  link: string
  horaInicio: Timestamp<Date>
  horaTermino: Timestamp<Date>
  contato: FormsContatoViewModel
  assunto: string
  local: string
}
