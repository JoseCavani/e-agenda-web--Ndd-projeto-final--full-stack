import { FormaPgtoDespesaEnum } from "./FormaPgtoDespesa.Enum";

export class VisualizarDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categorias :string[] = []

}
