using System;

namespace eAgenad.WebApi.ViewModel.ModuloAutenticacao
{
    public class UsuarioTokenViewModel
    {
        public Guid Id { get; internal set; }
        public string Nome { get; internal set; }
        public string Email { get; internal set; }
    }
}
