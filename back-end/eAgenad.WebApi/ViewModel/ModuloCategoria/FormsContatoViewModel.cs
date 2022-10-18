using eAgenda.Webapi.ViewModels;
using System;
using System.ComponentModel.DataAnnotations;

namespace eAgenad.WebApi.ViewModel.ModuloContato
{
    public class FormsCategoriaViewModel
    {
        public Guid id { get; set; }
        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public string Titulo { get; set; }
    }
    public class InserirCategoriaViewModel : FormsCategoriaViewModel
    {

    }

    public class EditarCategoriaViewModel : FormsCategoriaViewModel
    {

    }
}