using System;
using System.Collections.Generic;

namespace eAgenda.Dominio.Compartilhado
{
    public interface IRepositorio<T> where T : EntidadeBase<T>
    {
        void Inserir(T novoRegistro);

        void Editar(T registro);

        void Excluir(T registro);

        List<T> SelecionarTodos(Guid id);

        T SelecionarPorId(Guid numero);
    }
}
