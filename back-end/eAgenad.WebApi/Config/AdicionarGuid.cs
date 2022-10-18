using AutoMapper;
using eAgenda.Dominio.Compartilhado;
using eAgenda.Webapi.ViewModels;
using System;

namespace eAgenad.WebApi.Config
{
    public class AdicionarGuid<T> : IMappingAction<object, EntidadeBase<T>>
    { 

        public void Process(object source, EntidadeBase<T> destination, ResolutionContext context)
        {
            destination.Id = Guid.NewGuid();
        }
    }
}
