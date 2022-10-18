using System.ComponentModel;

namespace eAgenda.Dominio.ModuloDespesa
{
    public enum FormaPgtoDespesaEnum
    {
        [Description("PIX")]
        PIX =0,
        [Description("Dinheiro")]
        Dinheiro = 1,
       [Description("Cartao de credito")]
        CartaoCredito = 2
    }

}
