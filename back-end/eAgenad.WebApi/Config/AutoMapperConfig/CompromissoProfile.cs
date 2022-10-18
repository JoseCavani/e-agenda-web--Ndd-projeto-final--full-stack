using AutoMapper;
using eAgenad.WebApi.ViewModel.ModuloCompromisso;
using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenda.Dominio.Compartilhado;
using eAgenda.Dominio.ModuloCompromisso;
using eAgenda.Dominio.ModuloContato;
using eAgenda.Dominio.ModuloTarefa;
using eAgenda.Webapi.AutoMapperConfig;

namespace eAgenad.WebApi.Config.AutoMapperConfig
{
    public class CompromissoProfile : Profile
    {
        public CompromissoProfile()
        {
            CreateMap<Compromisso, ListarCompromissosViewModel>()
             .ForMember(destino => destino.TipoLocal, opt => opt.MapFrom(origem => origem.TipoLocal.GetDescription()))
              .AfterMap((ViewModel, compromisso) =>
              {
                  compromisso.Contato = ViewModel.Contato;
              });

            CreateMap<Compromisso, VisualizarCompromissoViewModel>()
             .ForMember(destino => destino.TipoLocal, opt => opt.MapFrom(origem => origem.TipoLocal.GetDescription()))
              .AfterMap((ViewModel, compromisso) =>
              {
                  compromisso.Contato = ViewModel.Contato;
              });

            CreateMap<InserirCompromissoViewModel, Compromisso>()
                .ForMember(destino => destino.UsuarioId, opt => opt.MapFrom<UsuarioResolver>())
            .ForMember(destino => destino.TipoLocal, opt => opt.MapFrom(origem => origem.TipoLocal.GetDescription()))
               .AfterMap<AdicionarGuid<Compromisso>>();
   
            CreateMap<EditarCompromissoViewModel, Compromisso>()
            .ForMember(destino => destino.TipoLocal, opt => opt.MapFrom(origem => origem.TipoLocal.GetDescription()));
        }
    }
}
