using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenda.Dominio.ModuloDespesa;
using System;
using System.Collections.Generic;

namespace eAgenda.Webapi.ViewModels
{
    public class VisualizarDespesaViewModel
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; }

        public decimal Valor { get; set; }

        public DateTime Data { get; set; }

        public string FormaPagamento { get; set; }

        public List<string> Categorias { get; set; }
    }
}