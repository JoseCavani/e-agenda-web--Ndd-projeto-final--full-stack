describe('Processo de Registro do Usuario', () => {


  beforeEach(() => {
    cy.visit('conta/registrar');
  })


  it('Deve carregar a pagina',() => {

    cy.title().should('contain','Registro - e-Agenda')
  });

  it('Deve notificar sobre formulario invalido', () => {

    const inputNome = cy.get('[formControlName = nome]');
    const inputEmail = cy.get('[formControlName = email]');
    const inputSenha = cy.get('[formControlName = senha]');
    const inputConfirmarSenha = cy.get('[formControlName = confirmarSenha]');
    const btnRegistrar = cy.get('button[type =submit]');


    inputNome.type('Testes Cypress');
    inputEmail.type('testador@cypress.com')
    inputSenha.type('Teste')
    inputConfirmarSenha.type('Teste')
    btnRegistrar.click();

    cy.wait(500);


    cy.contains('formulario nao prenchido corretamente')

  })

  it('Deve registrar e redirecionar novo usuario',() => {

    const inputNome = cy.get('[formControlName = nome]');
    const inputEmail = cy.get('[formControlName = email]');
    const inputSenha = cy.get('[formControlName = senha]');
    const inputConfirmarSenha = cy.get('[formControlName = confirmarSenha]');
    const btnRegistrar = cy.get('button[type =submit]');


    inputNome.type('Testes Cypress');
    inputEmail.type('testador@cypress.com')
    inputSenha.type('Teste@123')
    inputConfirmarSenha.type('Teste@123')
    btnRegistrar.click();

    cy.wait(300);
    cy.url().should('contain', 'dashboard');

  })

  it('Deve notificar sobre usuario repetido',() => {

    const inputNome = cy.get('[formControlName = nome]');
    const inputEmail = cy.get('[formControlName = email]');
    const inputSenha = cy.get('[formControlName = senha]');
    const inputConfirmarSenha = cy.get('[formControlName = confirmarSenha]');
    const btnRegistrar = cy.get('button[type =submit]');


    inputNome.type('Testes Cypress');
    inputEmail.type('testador@cypress.com')
    inputSenha.type('Teste@123')
    inputConfirmarSenha.type('Teste@123')
    btnRegistrar.click();

    cy.wait(300);
    cy.contains("Error: Login 'testador@cypress.com' já está sendo utilizado.");

  })
  it('Deve notificar sobre senhas diferentes',() => {

    const inputNome = cy.get('[formControlName = nome]');
    const inputEmail = cy.get('[formControlName = email]');
    const inputSenha = cy.get('[formControlName = senha]');
    const inputConfirmarSenha = cy.get('[formControlName = confirmarSenha]');
    const btnRegistrar = cy.get('button[type =submit]');


    inputNome.type('Testes Cypress 3');
    inputEmail.type('testador3@cypress.com')
    inputSenha.type('Teste@123')
    inputConfirmarSenha.type('Teste@1234')
    btnRegistrar.click();

    cy.wait(300);

    cy.contains('as senhas nao conferem')

  })

  it('Deve validar nome vazio',() => {

    const inputNome = cy.get('[formControlName = nome]');
    const inputEmail = cy.get('[formControlName = email]');

    inputNome.type('12');
    inputEmail.focus();

    cy.contains('O nome deve ter no mínimo 3 caracteres.');
  })

  it('Deve validar email vazio',() => {

    const inputSenha = cy.get('[formControlName = senha]');

    const inputEmail = cy.get('[formControlName = email]');

    inputEmail.focus();
    inputSenha.focus();

    cy.contains('O email precisa ser preenchido.');
  })

  it('Deve validar email em formato incorreto',() => {

    const inputSenha = cy.get('[formControlName = senha]');

    const inputEmail = cy.get('[formControlName = email]');

    inputEmail.type('teste');
    inputSenha.focus();

    cy.contains('O email precisa seguir o formato "usuario@dominio.com"');
  })

  it('Deve validar senha curta',() => {

    const inputSenha = cy.get('[formControlName = senha]');

    const inputEmail = cy.get('[formControlName = email]');

    inputSenha.type('AA');
    inputEmail.focus();

    cy.contains('A senha deve ter no mínimo 6 caracteres.');
  })


})
