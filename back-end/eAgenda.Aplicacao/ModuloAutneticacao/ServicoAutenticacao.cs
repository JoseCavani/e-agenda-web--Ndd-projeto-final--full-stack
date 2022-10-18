using eAgenda.Dominio;
using eAgenda.Dominio.ModuloAutenticacao;
using eAgenda.Dominio.ModuloTarefa;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eAgenda.Aplicacao.ModuloAutneticacao
{
    public class ServicoAutenticacao : ServicoBase<Usuario, ValidadorUsuario>
    {
        private UserManager<Usuario> userManager;
        private readonly SignInManager<Usuario> signInManager;

        public ServicoAutenticacao(UserManager<Usuario> userManager, SignInManager<Usuario> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }


        public async Task<Result<Usuario>> RegistrarUsuario(Usuario usuario,string senha)
        {



            Log.Logger.Debug("Tentando registrar usuario... {@u}", usuario);

            var resultado = Validar(usuario);
            if (resultado.IsFailed)
                return Result.Fail(resultado.Errors);

            try
            {
               IdentityResult usuarioResult = await userManager.CreateAsync(usuario,senha);

                if (!usuarioResult.Succeeded)
                {
                    var errors = usuarioResult.Errors.Select(IdentityError => new Error(IdentityError.Description));
                    return Result.Fail(errors);

                }

                Log.Logger.Information("Usuario {UsuarioId} registrado com sucesso", usuario.Id);
            }
            catch (Exception ex)
            {
                string msgErro = "Falha no sistema ao tentar registrar o Usuario";

                Log.Logger.Error(ex, msgErro + " {UsuarioId}", usuario.Id);

                return Result.Fail(msgErro);
            }

            return Result.Ok(usuario);

        }
        public async Task<Result<Usuario>> AutenticarUsuario(string email, string senha)
        {
            Log.Logger.Debug("Tentando autenticar usuario... {@u}", email);

           SignInResult loginResult = await signInManager.PasswordSignInAsync(email, senha, false, true);

            if (loginResult.Succeeded == false && loginResult.IsLockedOut)
            {

                string msgErro = "Usuario Bloquado";

                Log.Logger.Warning(msgErro + " {UsuarioEmail}", email);

                return Result.Fail("Usuario Bloqueado");
            }

            if (loginResult.Succeeded == false)
            {
                string msgErro = "Usuario ou senha incorretos";

                Log.Logger.Warning(msgErro + " {UsuarioEmail}", email);

                return Result.Fail(msgErro);
            }


            Usuario usuario =  await userManager.FindByEmailAsync(email);

            return Result.Ok(usuario);

        }
        public async Task<Result<Usuario>> Sair()
        {
            await signInManager.SignOutAsync();

            Log.Logger.Debug("sessao do usuario removida...");

            return Result.Ok();
        }
    }
}
