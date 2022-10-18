using eAgenda.Webapi.ViewModels;
using System;
using System.ComponentModel.DataAnnotations;

namespace eAgenad.WebApi.ViewModel.ModuloContato
{
    public class FormsContatoViewModel
    {
        public Guid id { get; set; }
        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public string Email { get; set; }
        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public string Telefone { get; set; }
        public string Empresa { get; set; }
        public string Cargo { get; set; }
    }
    public class InserirContatoViewModel : FormsContatoViewModel
    {

    }

    public class EditarContatoViewModel : FormsContatoViewModel
    {

    }
}