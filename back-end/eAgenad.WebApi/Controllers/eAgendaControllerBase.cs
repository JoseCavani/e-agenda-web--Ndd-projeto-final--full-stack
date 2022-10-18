﻿using eAgenad.WebApi.ViewModel.ModuloAutenticacao;
using FluentResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace eAgenad.WebApi.Controllers
{

    [ApiController]
    public abstract class eAgendaControllerBase : ControllerBase
    {

        private UsuarioTokenViewModel usuario;


        public UsuarioTokenViewModel UsuarioLogado
        {
            get
            {
                if (EstaAutenticado())
                {
                    usuario = new UsuarioTokenViewModel();
                    var id = Request?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                    if (!string.IsNullOrEmpty(id))
                        usuario.Id = Guid.Parse(id);

                    var nome = Request?.HttpContext?.User?.FindFirst(ClaimTypes.GivenName)?.Value;

                    if (!string.IsNullOrEmpty(nome))
                        usuario.Nome = nome;

                    var email = Request?.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;

                    if (!string.IsNullOrEmpty(email))
                        usuario.Email = email;

                    return usuario;
                }
                return null;
            }
        }

        protected bool RegistroNaoEncontrado<T>(Result<T> registroResult)
        {
            return registroResult.Errors.Any(x => x.Message.Contains("nao encontrado"));
        }

      

        protected ActionResult NotFound<T>(Result<T> registroResult)
        {
            return StatusCode(404, new
            {
                sucesso = false,
                erros = registroResult.Errors.Select(x => x.Message)
            });
        }

        protected ActionResult InternalError<T>(Result<T> registroResult)
        {
            return StatusCode(500, new
            {
                sucesso = false,
                erros = registroResult.Errors.Select(x => x.Message)
            });
        }

        protected ActionResult BadRequest<T>(Result<T> registroResult)
        {
            return StatusCode(300, new
            {
                sucesso = false,
                erros = registroResult.Errors.Select(x => x.Message)
            });
        }

        private bool EstaAutenticado()
        {
            if (Request?.HttpContext?.User?.Identity != null)
                return true;

            return false;
        }

    }
}
