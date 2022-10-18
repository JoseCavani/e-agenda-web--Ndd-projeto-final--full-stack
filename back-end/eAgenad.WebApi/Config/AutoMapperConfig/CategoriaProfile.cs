using AutoMapper;
using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenad.WebApi.ViewModel.ModuloDespesa;
using eAgenda.Dominio.ModuloCompromisso;
using eAgenda.Dominio.ModuloContato;
using eAgenda.Dominio.ModuloDespesa;
using eAgenda.Webapi.AutoMapperConfig;
using eAgenda.Webapi.ViewModels;

namespace eAgenad.WebApi.Config.AutoMapperConfig
{
    public class CategoriaProfile: Profile
    {
        public CategoriaProfile()
        {

            CreateMap<Categoria, ListarCategoriaViewModel>();

            CreateMap<Categoria, VisualizarCategoriaViewModel>();

            CreateMap<Despesa, ListarDespesaViewModel>();

            CreateMap<InserirCategoriaViewModel, Categoria>()
                .ForMember(destino => destino.UsuarioId, opt => opt.MapFrom<UsuarioResolver>())
                .AfterMap<AdicionarGuid<Categoria>>();

            CreateMap<EditarCategoriaViewModel, Categoria>();

            CreateMap<Categoria, CategoriaSelecionadaViewModel>();
            CreateMap<CategoriaSelecionadaViewModel, Categoria>();
        }
    }
}
