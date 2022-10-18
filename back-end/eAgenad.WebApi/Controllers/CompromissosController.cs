using AutoMapper;
using eAgenad.WebApi.Config.AutoMapperConfig;
using eAgenad.WebApi.Controllers;
using eAgenad.WebApi.ViewModel.ModuloCompromisso;
using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenda.Aplicacao.ModuloCompromisso;
using eAgenda.Aplicacao.ModuloContato;
using eAgenda.Aplicacao.ModuloTarefa;
using eAgenda.Dominio.ModuloCompromisso;
using eAgenda.Dominio.ModuloContato;
using eAgenda.Dominio.ModuloTarefa;
using eAgenda.Infra.Configs;
using eAgenda.Infra.Orm;
using eAgenda.Infra.Orm.ModuloCompromisso;
using eAgenda.Infra.Orm.ModuloContato;
using eAgenda.Infra.Orm.ModuloTarefa;
using eAgenda.Webapi.Config.AutoMapperConfig;
using eAgenda.Webapi.ViewModels;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eAgenad.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompromissosController : eAgendaControllerBase
    {
         private readonly ServicoCompromisso servicoCompromisso;
        private readonly IMapper mapeadorCompromissos;
        private readonly ServicoContato servicoContato;

        public CompromissosController(ServicoCompromisso servicoCompromisso, IMapper mapeadorCompromissos,ServicoContato servicoContato)
        {
            this.servicoCompromisso = servicoCompromisso;
            this.mapeadorCompromissos = mapeadorCompromissos;
            this.servicoContato = servicoContato;
        }
        [HttpGet]
        public ActionResult<List<ListarCompromissosViewModel>> SelecionarTodos()
        {
            var compromissoResult = servicoCompromisso.SelecionarTodos(UsuarioLogado.Id);


            if (compromissoResult.IsFailed)
                return InternalError(compromissoResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorCompromissos.Map<List<ListarCompromissosViewModel>>(compromissoResult.Value)
            });

        }


        [HttpGet, Route("entre/{dataInicial:datetime}/{dataFinal:datetime}")]
        public ActionResult<List<ListarCompromissosViewModel>> SelecionarCompromissosFuturos(DateTime dataInicial,DateTime dataFinal)
        {
            var compromissoResult = servicoCompromisso.SelecionarCompromissosFuturos(dataInicial, dataFinal);

            if (compromissoResult.IsFailed)
                return InternalError(compromissoResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorCompromissos.Map<List<ListarCompromissosViewModel>>(compromissoResult.Value)
            });
        }


        [HttpGet, Route("passados/{dataAtual:datetime}")]
        public ActionResult<List<ListarCompromissosViewModel>> SelecionarCompromissosPassados(DateTime dataAtual)
        {
            var compromissoResult = servicoCompromisso.SelecionarCompromissosPassados(dataAtual);

            if (compromissoResult.IsFailed)
                return InternalError(compromissoResult);

            return Ok(new
            {
                sucesso = true,
                dados =mapeadorCompromissos.Map<List<ListarCompromissosViewModel>>(compromissoResult.Value)
            });
        }


        [HttpGet("visualizacao-completa/{id:guid}")]
        public ActionResult<FormsDespesaViewModel> SelecionarCompromissoPorId(Guid id)
        {
            var comrpmoissoResult = servicoCompromisso.SelecionarPorId(id);

            if (comrpmoissoResult.IsFailed && RegistroNaoEncontrado(comrpmoissoResult))
            {
                return NotFound(comrpmoissoResult);
            }

            if (comrpmoissoResult.IsFailed)
                return InternalError(comrpmoissoResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorCompromissos.Map<VisualizarDespesaViewModel>(comrpmoissoResult.Value)
            });
        }

        [HttpGet("{id}")]
        public ActionResult<VisualizarCompromissoViewModel> SelecionarPorId(string id)
        {

            var compromissoResult = servicoCompromisso.SelecionarPorId(Guid.Parse(id));

            if (compromissoResult.IsFailed && RegistroNaoEncontrado(compromissoResult))
            {
                return NotFound(compromissoResult);
            }

            if (compromissoResult.IsFailed)
                return InternalError(compromissoResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorCompromissos.Map<VisualizarCompromissoViewModel>(compromissoResult.Value)
            });


        }
        [HttpPost]
        public ActionResult<FormsCompromissoViewModel> Inserir(InserirCompromissoViewModel compromissoVM)
        {
            var id = compromissoVM.ContatoId;

            var compromisso = mapeadorCompromissos.Map<Compromisso>(compromissoVM);

            compromisso.Contato = servicoContato.SelecionarPorId(id).Value;

            var compromissoResult = servicoCompromisso.Inserir(compromisso);

            if (compromissoResult.IsFailed && RegistroNaoEncontrado(compromissoResult))
            {
                return NotFound(compromissoResult);
            }

            if (compromissoResult.IsFailed)
                return InternalError(compromissoResult);

            return Ok(new
            {
                sucesso = true,
                dados = compromissoVM
            });
        }

        [HttpPut("{id:guid}")]
        public ActionResult<FormsCompromissoViewModel> Editar(Guid id, EditarCompromissoViewModel compromissoVM)
        {

            var compromissoResult = servicoCompromisso.SelecionarPorId(id);


            if (compromissoResult.IsFailed && RegistroNaoEncontrado(compromissoResult))
            {
                return NotFound(compromissoResult);
            }

            var compromisso = mapeadorCompromissos.Map(compromissoVM, compromissoResult.Value);

            compromissoResult = servicoCompromisso.Editar(compromisso);

            if (compromissoResult.IsFailed)
                return InternalError(compromissoResult);

            return Ok(new
            {
                sucesso = true,
                dados = compromissoVM
            });

        }

        [HttpDelete("{id:guid}")]
        public ActionResult Excluir(Guid id)
        {
            var compromissoResult = servicoCompromisso.Excluir(id);

            if (compromissoResult.IsFailed && RegistroNaoEncontrado<Compromisso>(compromissoResult))
            {
                return NotFound(compromissoResult);
            }


            if (compromissoResult.IsFailed)
                return InternalError<Compromisso>(compromissoResult);

            return NoContent();

        }
    }
}