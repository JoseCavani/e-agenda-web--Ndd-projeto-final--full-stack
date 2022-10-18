using AutoMapper;
using eAgenad.WebApi.Config;
using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenda.Dominio.ModuloContato;
using eAgenda.Dominio.ModuloTarefa;
using eAgenda.Webapi.AutoMapperConfig;
using eAgenda.Webapi.ViewModels;

namespace eAgenda.Webapi.Config.AutoMapperConfig
{
    public class ContatoProfile: Profile
    {
        public ContatoProfile()
        {

            CreateMap<Contato, ListarContatosViewModel>();

            CreateMap<Contato, VisualizarContatoViewModel>();

            CreateMap<InserirContatoViewModel, Contato>()
                .ForMember(destino => destino.UsuarioId, opt => opt.MapFrom<UsuarioResolver>())
                 .AfterMap<AdicionarGuid<Contato>>();
            

            CreateMap<EditarContatoViewModel, Contato>();
        }
    }
}
