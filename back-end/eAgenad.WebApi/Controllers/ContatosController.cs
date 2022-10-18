using AutoMapper;
using eAgenad.WebApi.Controllers;
using eAgenad.WebApi.ViewModel.ModuloContato;
using eAgenda.Aplicacao.ModuloContato;
using eAgenda.Aplicacao.ModuloTarefa;
using eAgenda.Dominio.ModuloContato;
using eAgenda.Dominio.ModuloTarefa;
using eAgenda.Infra.Configs;
using eAgenda.Infra.Orm;
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

namespace eAgenda.Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContatosController : eAgendaControllerBase
    {
        private readonly ServicoContato servicoContato;
        private readonly IMapper mapeadorContatos;

        public ContatosController(ServicoContato servicoContato, IMapper mapeadorContatos)
        {
            this.servicoContato = servicoContato;
            this.mapeadorContatos = mapeadorContatos;
        }
        [HttpGet]
        public ActionResult<List<ListarContatosViewModel>> SelecionarTodos()
        {
            var contatoResult = servicoContato.SelecionarTodos(UsuarioLogado.Id);


            if (contatoResult.IsFailed)
                return InternalError(contatoResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorContatos.Map<List<ListarContatosViewModel>>(contatoResult.Value)
            });

        }

        [HttpGet("visualizacao-completa/{id:guid}")]
        public ActionResult<FormsDespesaViewModel> SelecionarContatoPorId(Guid id)
        {
            var despesaResult = servicoContato.SelecionarPorId(id);

            if (despesaResult.IsFailed && RegistroNaoEncontrado(despesaResult))
            {
                return NotFound(despesaResult);
            }

            if (despesaResult.IsFailed)
                return InternalError(despesaResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorContatos.Map<VisualizarDespesaViewModel>(despesaResult.Value)
            });
        }

        [HttpGet("{id}")]
        public ActionResult<VisualizarContatoViewModel> SelecionarPorId(string id)
        {

            var contatoResult = servicoContato.SelecionarPorId(Guid.Parse(id));

            if (contatoResult.IsFailed && RegistroNaoEncontrado(contatoResult))
            {
                return NotFound(contatoResult);
            }

            if (contatoResult.IsFailed)
                return InternalError(contatoResult);

            return Ok(new
            {
                sucesso = true,
                dados = mapeadorContatos.Map<VisualizarContatoViewModel>(contatoResult.Value)
            });


        }
        [HttpPost]
        public ActionResult<FormsContatoViewModel> Inserir(InserirContatoViewModel contatoVM)
        {
 

            var contato = mapeadorContatos.Map<Contato>(contatoVM);

            var contatoResult = servicoContato.Inserir(contato);

            if (contatoResult.IsFailed)
                return InternalError(contatoResult);

            return Ok(new
            {
                sucesso = true,
                dados = contatoVM
            });
        }

        [HttpPut("{id:guid}")]
        public ActionResult<FormsContatoViewModel> Editar(Guid id, EditarContatoViewModel contatoVM)
        {
          
            var contatoResult = servicoContato.SelecionarPorId(id);


            if (contatoResult.IsFailed && RegistroNaoEncontrado(contatoResult))
            {
                return NotFound(contatoResult);
            }

            var contato = mapeadorContatos.Map(contatoVM, contatoResult.Value);

            contatoResult = servicoContato.Editar(contato);

            if (contatoResult.IsFailed)
                return InternalError(contatoResult);

            return Ok(new
            {
                sucesso = true,
                dados = contatoVM
            });

        }

        [HttpDelete("{id:guid}")]
        public ActionResult Excluir(Guid id)
        {
            var contatoResult =  servicoContato.Excluir(id);

            if (contatoResult.IsFailed && RegistroNaoEncontrado<Contato>(contatoResult))
            {
                return NotFound(contatoResult);
            }


            if (contatoResult.IsFailed)
                return InternalError<Contato>(contatoResult);

            return NoContent();

        }
    }
}