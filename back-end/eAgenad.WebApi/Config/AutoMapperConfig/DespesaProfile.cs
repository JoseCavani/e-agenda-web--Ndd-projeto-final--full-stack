using AutoMapper;
using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenad.WebApi.ViewModel.ModuloDespesa;
using eAgenda.Dominio.Compartilhado;
using eAgenda.Dominio.ModuloDespesa;
using eAgenda.Dominio.ModuloTarefa;
using eAgenda.Webapi.AutoMapperConfig;
using eAgenda.Webapi.ViewModels;
using System.Linq;

namespace eAgenad.WebApi.Config.AutoMapperConfig
{
    public class DespesaProfile : Profile
    {
        public DespesaProfile()
        {
            CreateMap<Despesa, ListarDespesaViewModel>()
               .ForMember(destino => destino.FormaPagamento, opt => opt.MapFrom(origem => origem.FormaPagamento.GetDescription()));

            CreateMap<Categoria, VisualizarCategoriaViewModel>();

            CreateMap<Despesa, VisualizarDespesaViewModel>()
              .ForMember(destino => destino.FormaPagamento, opt => opt.MapFrom(origem => origem.FormaPagamento.GetDescription()))
              .ForMember(destino => destino.Categorias, opt =>
                  opt.MapFrom(origem => origem.Categorias.Select(x => x.Titulo)));

            CreateMap<FormsDespesaViewModel, Despesa>()
                .ForMember(destino => destino.UsuarioId, opt => opt.MapFrom<UsuarioResolver>())
             .AfterMap<ConfigurarCategoriasMappingAction>()
             .ForMember(destino => destino.Id, opt => opt.Ignore());

            CreateMap<Despesa, FormsDespesaViewModel>()
                .AfterMap<AtribuirCategoriasMappingAction>();

        }
    }

    internal class AtribuirCategoriasMappingAction : IMappingAction<Despesa, FormsDespesaViewModel>
    {
        public void Process(Despesa source, FormsDespesaViewModel destination, ResolutionContext context)
        {
            destination.categoriasSelecionadas = new System.Collections.Generic.List<CategoriaSelecionadaViewModel>();
            if (source.Categorias.Count > 0)
            foreach (var categoria in source.Categorias)
            {
            var categoriaSelecionada = new CategoriaSelecionadaViewModel();

                categoriaSelecionada.Id = categoria.Id;
                categoriaSelecionada.Titulo = categoria.Titulo;
                categoriaSelecionada.Selecionada = true;

                    

                destination.categoriasSelecionadas.Add(categoriaSelecionada);
            }
        }
    }

    public class ConfigurarCategoriasMappingAction : IMappingAction<FormsDespesaViewModel, Despesa>
    {
        private readonly IRepositorioCategoria repositorioCategoria;

        public ConfigurarCategoriasMappingAction(IRepositorioCategoria repositorioCategoria)
        {
            this.repositorioCategoria = repositorioCategoria;
        }


        public void Process(FormsDespesaViewModel despesaVM, Despesa despesa, ResolutionContext context)
        {
            foreach (var categoriaVM in despesaVM.categoriasSelecionadas)
            {
                var categoria = repositorioCategoria.SelecionarPorId(categoriaVM.Id);

                if (categoriaVM.Selecionada)
                    despesa.AtribuirCategoria(categoria);
                else
                    despesa.RemoverCategoria(categoria);

            }
        }
    }
}