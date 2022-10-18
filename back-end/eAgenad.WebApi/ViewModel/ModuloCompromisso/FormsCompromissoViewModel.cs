using eAgenad.WebApi.ViewModel.ModuloCompromisso;
using System.ComponentModel.DataAnnotations;
using System;
using eAgenda.Dominio.ModuloTarefa;
using eAgenda.Webapi.ViewModels;
using System.Collections.Generic;
using eAgenda.Dominio.ModuloCompromisso;
using eAgenda.Dominio.ModuloContato;

namespace eAgenad.WebApi.ViewModel.ModuloCompromisso
{
    public class FormsCompromissoViewModel
    {
        public Guid id { get; set; }

        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public string Assunto { get; set; }
        public string Local { get; set; }

        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public TipoLocalizacaoCompromissoEnum TipoLocal { get; set; }
        public DateTime Data { get; set; }
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraTermino { get; set; }
        public string Link { get; set; }

        public Guid ContatoId { get; set; }
    }
    public class InserirCompromissoViewModel : FormsCompromissoViewModel
    {

    }

    public class EditarCompromissoViewModel : FormsCompromissoViewModel
    {

    }
}
