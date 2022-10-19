using AutoMapper;
using eAgenda.Aplicacao.ModuloDespesa;
using eAgenda.Dominio.ModuloDespesa;
using eAgenda.Infra.Configs;
using eAgenda.Infra.Orm.ModuloDespesa;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using eAgenad.WebApi.Config.AutoMapperConfig;
using eAgenda.Infra.Orm;
using eAgenda.Webapi.ViewModels;

namespace eAgenad.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DespesasController : eAgendaControllerBase
    {
        private readonly ServicoDespesa servicoDespesa;
        private readonly IMapper mapeadorDespesas;

        public DespesasController(ServicoDespesa servicoDespesa, IMapper mapeadorDespesas)
        {
            this.servicoDespesa = servicoDespesa;
            this.mapeadorDespesas = mapeadorDespesas;
        }

        [HttpGet]
        public ActionResult<List<ListarDespesaViewModel>> SelecionarTodos()
        {
            var despesaResult = servicoDespesa.SelecionarTodos(UsuarioLogado.Id);


            if (despesaResult.IsFailed)
                return InternalError(despesaResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorDespesas.Map<List<ListarDespesaViewModel>>(despesaResult.Value)
            });


        }



        [HttpGet("{id:guid}")]
        public ActionResult<FormsDespesaViewModel> SelecionarPorId(Guid id) // D6E3F379-E6CE-4F6F-8C95-08DA9A4935DF
        {
            var despesaResult = servicoDespesa.SelecionarPorId(id);

            if (despesaResult.IsFailed && RegistroNaoEncontrado(despesaResult))
            {
                return NotFound(despesaResult);
            }

            if (despesaResult.IsFailed)
                return InternalError(despesaResult);

            var a = mapeadorDespesas.Map<FormsDespesaViewModel>(despesaResult.Value);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorDespesas.Map<FormsDespesaViewModel>(despesaResult.Value)
            });
        }


        [HttpGet("visualizacao-completa/{id:guid}")]
        public ActionResult<VisualizarDespesaViewModel> SelecionarDespesaPorId(Guid id)
        {
            var despesaResult = servicoDespesa.SelecionarPorId(id);

            if (despesaResult.IsFailed && RegistroNaoEncontrado(despesaResult))
            {
                return NotFound(despesaResult);
            }

            if (despesaResult.IsFailed)
                return InternalError(despesaResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorDespesas.Map<VisualizarDespesaViewModel>(despesaResult.Value)
            });
        }


        [HttpPost]
        public ActionResult<FormsDespesaViewModel> Inserir(InserirDespesaViewModel despesaVM) //databinding - modelbinder
        {

            var despesa = mapeadorDespesas.Map<Despesa>(despesaVM);

            var despesaResult = servicoDespesa.Inserir(despesa);

            if (despesaResult.IsFailed)
                return InternalError(despesaResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorDespesas.Map<VisualizarDespesaViewModel>(despesaResult.Value)
            });
        }



        [HttpPut("{id:guid}")]
        public ActionResult<FormsDespesaViewModel> Editar(Guid id, EditarDespesaViewModel despesaVM)
        {

            var despesaResult = servicoDespesa.SelecionarPorId(id);
          


            if (despesaResult.IsFailed && RegistroNaoEncontrado(despesaResult))
            {
                return NotFound(despesaResult);
            }

            var despesa = mapeadorDespesas.Map(despesaVM, despesaResult.Value);

            despesaResult = servicoDespesa.Editar(despesa);

            if (despesaResult.IsFailed)
                return InternalError(despesaResult);

            return Ok(new
            {
                sucesso = true,
                dados = despesaVM
            });
        }



        [HttpDelete("{id:guid}")]
        public ActionResult Excluir(Guid id)
        {
            var despesaResult = servicoDespesa.Excluir(id);

            if (despesaResult.IsFailed && RegistroNaoEncontrado<Despesa>(despesaResult))
            {
                return NotFound(despesaResult);
            }

            if (despesaResult.IsFailed)
                return InternalError<Despesa>(despesaResult);

            return NoContent();
        }
    }
}