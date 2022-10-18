using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenad.WebApi.ViewModel.ModuloDespesa;
using eAgenda.Dominio.ModuloDespesa;
using eAgenda.Dominio.ModuloTarefa;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eAgenda.Webapi.ViewModels
{
    public class FormsDespesaViewModel
    {
        public Guid id { get; set; }
        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public FormaPgtoDespesaEnum FormaPagamento { get; set; }
        public List<CategoriaSelecionadaViewModel> categoriasSelecionadas { get; set; }

    }


    public class InserirDespesaViewModel : FormsDespesaViewModel
    {

    }

    public class EditarDespesaViewModel : FormsDespesaViewModel
    {
    }

}