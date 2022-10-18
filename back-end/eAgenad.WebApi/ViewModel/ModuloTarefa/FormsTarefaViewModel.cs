using eAgenda.Dominio.ModuloTarefa;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eAgenda.Webapi.ViewModels
{
    public class FormsTarefaViewModel
    {
        public Guid id { get; set; }

        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "O '{0}' é obrigatorio")]
        public PrioridadeTarefaEnum Prioridade { get; set; }

        public List<FormsItemTarefaViewModel> Itens { get; set; }

    }


    public class InserirTarefaViewModel: FormsTarefaViewModel
    {

    }

    public class EditarTarefaViewModel : FormsTarefaViewModel
    {

    }

}