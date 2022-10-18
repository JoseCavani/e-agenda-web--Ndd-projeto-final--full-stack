using eAgenda.Webapi.ViewModels;
using System;
using System.Collections.Generic;

namespace eAgenad.WebApi.ViewModel.ModuloContato
{
    public class VisualizarCategoriaViewModel
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }

        public List<ListarDespesaViewModel> Despesas { get; set; }
    }
}
