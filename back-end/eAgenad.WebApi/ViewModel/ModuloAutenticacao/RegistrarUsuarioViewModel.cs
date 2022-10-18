using System.ComponentModel.DataAnnotations;

namespace eAgenad.WebApi.ViewModel.ModuloAutenticacao
{
    public class RegistrarUsuarioViewModel
    {
        [Required(ErrorMessage =  "o campo {0} é obrigatorio")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "o campo {0} é obrigatorio")]
        [EmailAddress(ErrorMessage = "o campo {0} esta em formato invalido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "o campo {0} é obrigatorio")]
        [StringLength(100,ErrorMessage = "o campo {0} precisa ter entre {2} e {1} caracaters", MinimumLength = 6)]
        public string Senha { get; set; }
        [Compare("Senha",ErrorMessage = "as senhas nao conferem")]
        public string ConfirmarSenha { get; set; }
    }
}
