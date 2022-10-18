using System.ComponentModel.DataAnnotations;

namespace eAgenad.WebApi.ViewModel.ModuloAutenticacao
{
    public class AutenticarUsuarioViewModel
    {
        [Required(ErrorMessage = "o campo {0} é obrigatorio")]
        [EmailAddress(ErrorMessage = "o campo {0} esta em formato invalido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "o campo {0} é obrigatorio")]
        [StringLength(100, ErrorMessage = "o campo {0} precisa ter entre {2} e {1} caracaters", MinimumLength = 6)]
        public string senha { get; set; }
    }
}
