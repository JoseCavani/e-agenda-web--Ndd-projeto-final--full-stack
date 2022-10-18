using AutoMapper;
using eAgenad.WebApi.ViewModel.ModuloAutenticacao;
using eAgenda.Dominio.ModuloAutenticacao;

namespace eAgenad.WebApi.Config.AutoMapperConfig
{
    public class UsuarioProfile : Profile
    {
        public UsuarioProfile()
        {
            CreateMap<RegistrarUsuarioViewModel, Usuario>()
                .ForMember(destino => destino.EmailConfirmed, opt => opt.MapFrom(origem => true))
                .ForMember(destino => destino.UserName, opt => opt.MapFrom(origem => origem.Email));
        }
    }
}
