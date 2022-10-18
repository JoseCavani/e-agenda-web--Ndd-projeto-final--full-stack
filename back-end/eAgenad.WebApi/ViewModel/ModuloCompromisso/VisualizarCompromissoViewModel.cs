using eAgenda.Dominio.ModuloAutenticacao;
using eAgenda.Dominio.ModuloCompromisso;
using eAgenda.Dominio.ModuloContato;
using System;

namespace eAgenad.WebApi.ViewModel.ModuloCompromisso
{
    public class VisualizarCompromissoViewModel
    {
        public Guid Id { get; set; }
        public DateTime Data { get; set; }
        public string TipoLocal { get; set; }
        public string Link { get; set; }

        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraTermino { get; set; }
        public Contato Contato { get; set; }
        public string Assunto { get; set; }
        public string Local { get; set; }
    }
}
