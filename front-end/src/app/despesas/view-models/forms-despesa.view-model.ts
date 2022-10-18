import { CategoriaSelecionadaViewModel } from "./categoria-selecionada.view-model";
import { FormaPgtoDespesaEnum } from "./FormaPgtoDespesa.Enum";

export class FormsDespesaViewModel {
  id: string;
  descricao: string;
  valor: string;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: CategoriaSelecionadaViewModel[] = [];
}

