import { Timestamp } from "rxjs";
import { FormsContatoViewModel } from "src/app/contatos/view-models/forms-contato.view-model";
import { TipoLocalCompromissoEnum } from "src/app/contatos/view-models/tipo-local-compromisso.enum";

export class
FormsCompromissoViewModel{
id: string;
assunto: string;
local: string;
tipoLocal: TipoLocalCompromissoEnum;
data:Date;
horaInicio:Timestamp<number>;
horaTermino:Timestamp<number>;
link: string;
contatoId: string;
contato?: FormsContatoViewModel;
}
