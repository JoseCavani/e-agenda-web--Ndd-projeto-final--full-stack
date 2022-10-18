using AutoMapper;
using eAgenda.Infra.Configs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using eAgenda.Dominio.ModuloDespesa;
using eAgenda.Aplicacao.ModuloDespesa;
using eAgenda.Infra.Orm.ModuloDespesa;
using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenda.Infra.Orm;
using eAgenad.WebApi.Config.AutoMapperConfig;
using eAgenda.Dominio.ModuloContato;
using eAgenda.Dominio;
using FluentResults;
using eAgenda.Aplicacao.ModuloTarefa;
using eAgenda.Webapi.ViewModels;

namespace eAgenad.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriasController : eAgendaControllerBase
    {
        private readonly ServicoCategoria servicoCategoria;
        private readonly IMapper mapeadorCategorias;

        public CategoriasController(ServicoCategoria servicoCategoria, IMapper mapeadorCategorias)
        {

            this.servicoCategoria = servicoCategoria;
            this.mapeadorCategorias = mapeadorCategorias;
        }
        [HttpGet]
        public ActionResult<List<ListarCategoriaViewModel>> SelecionarTodos()
        {
            var categoriaResult = servicoCategoria.SelecionarTodos(UsuarioLogado.Id);


            if (categoriaResult.IsFailed)
                return InternalError(categoriaResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorCategorias.Map<List<ListarCategoriaViewModel>>(categoriaResult.Value)
            });

        }

        [HttpGet("visualizacao-completa/{id:guid}")]
        public ActionResult<FormsDespesaViewModel> SelecionarCategoriaPorId(Guid id)
        {
            var despesaResult = servicoCategoria.SelecionarPorId(id);

            if (despesaResult.IsFailed && RegistroNaoEncontrado(despesaResult))
            {
                return NotFound(despesaResult);
            }

            if (despesaResult.IsFailed)
                return InternalError(despesaResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorCategorias.Map<VisualizarDespesaViewModel>(despesaResult.Value)
            });
        }

        [HttpGet("{id}")]
        public ActionResult<VisualizarCategoriaViewModel> SelecionarPorId(string id)
        {

            var categoriaResult = servicoCategoria.SelecionarPorId(Guid.Parse(id));

            if (categoriaResult.IsFailed && RegistroNaoEncontrado(categoriaResult))
            {
                return NotFound(categoriaResult);
            }

            if (categoriaResult.IsFailed)
                return InternalError(categoriaResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorCategorias.Map<VisualizarCategoriaViewModel>(categoriaResult.Value)
            });


        }
        [HttpPost]
        public ActionResult<FormsCategoriaViewModel> Inserir(InserirCategoriaViewModel categoriaVM)
        {


            var categoria = mapeadorCategorias.Map<Categoria>(categoriaVM);

            var categoriaResult = servicoCategoria.Inserir(categoria);

            if (categoriaResult.IsFailed)
                return InternalError(categoriaResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorCategorias.Map<VisualizarCategoriaViewModel>(categoriaResult.Value)
            });
        }

        [HttpPut("{id:guid}")]
        public ActionResult<FormsCategoriaViewModel> Editar(Guid id, EditarCategoriaViewModel categoriaVM)
        {

            var categoriaResult = servicoCategoria.SelecionarPorId(id);


            if (categoriaResult.IsFailed && RegistroNaoEncontrado(categoriaResult))
            {
                return NotFound(categoriaResult);
            }

            var categoria = mapeadorCategorias.Map(categoriaVM, categoriaResult.Value);

            categoriaResult = servicoCategoria.Editar(categoria);

            if (categoriaResult.IsFailed)
                return InternalError(categoriaResult);

            return Ok(new
            {
                sucesso = true,
                dados = categoriaVM
            });

        }
       

        [HttpDelete("{id:guid}")]
        public ActionResult Excluir(Guid id)
        {
            var categoriaResult = servicoCategoria.Excluir(id);

            if (categoriaResult.IsFailed && RegistroNaoEncontrado<Categoria>(categoriaResult))
            {
                return NotFound(categoriaResult);
            }


            if (categoriaResult.IsFailed)
                return InternalError<Categoria>(categoriaResult);

            return NoContent();

        }
    }
}