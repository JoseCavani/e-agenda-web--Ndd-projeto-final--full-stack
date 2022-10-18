using FluentValidation;
using FluentValidation.Validators;

namespace eAgenda.Dominio.ModuloContato
{

    public class ValidadorContato : AbstractValidator<Contato>
    {
        public ValidadorContato()
        {
            RuleFor(x => x.Nome)
                .NotNull().NotEmpty();

            RuleFor(x => x.Email)
                .EmailAddress(EmailValidationMode.AspNetCoreCompatible)
                .NotNull().NotEmpty();

            RuleFor(x => x.Telefone)
                .Telefone();
        }

    }
}
