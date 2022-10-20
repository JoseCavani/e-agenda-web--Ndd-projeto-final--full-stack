describe('Processo de login do usuario', () => {

  beforeEach(() => {
    cy.visit('/');
  })
  it('Deve acessar a pagina', () => {

    cy.title().should('contain', 'Login')
  })



  it('Deve notificar sobre formulario invalido', () => {
    const inputEmail = cy.get('[formControlName=email]');
    const inputSenha = cy.get('[formControlName=senha]');
    const btnEntrar = cy.get('button[type=submit]');

    inputEmail.type('name');
    inputSenha.type('Teste@123');

    btnEntrar.click();

    cy.wait(300);

    cy.contains('formulario nao prenchido corretamente')
  })

  it('Deve autenticar usuario valido', () => {
    const inputEmail = cy.get('[formControlName=email]');
    const inputSenha = cy.get('[formControlName=senha]');
    const btnEntrar = cy.get('button[type=submit]');

    inputEmail.type('ze.carlos98@hotmail.com');
    inputSenha.type('Senha@123');

    btnEntrar.click();

    cy.wait(500);

    cy.url().should('contain', 'dashboard')
  });

  it('Deve notificar credenciais invalidas',() =>{

    const inputEmail = cy.get('[formControlName=email]');
    const inputSenha = cy.get('[formControlName=senha]');
    const btnEntrar = cy.get('button[type=submit]');

    inputEmail.type('ze.carlos98@hotmail.com');
    inputSenha.type('Ssssenha@123');

    btnEntrar.click();

    cy.wait(500);

    cy.contains('Usuario ou senha incorretos')

  })

  it('Deve validar email vazio',() =>{

    const inputEmail = cy.get('[formControlName=email]');
    const inputSenha = cy.get('[formControlName=senha]');

    inputEmail.focus();
    inputSenha.focus();

    cy.contains('O email precisa ser preenchido')

  })

  it('Deve validar email em formato incorreto',() => {

    const inputSenha = cy.get('[formControlName = senha]');

    const inputEmail = cy.get('[formControlName = email]');

    inputEmail.type('teste');
    inputSenha.focus();

    cy.contains('O email precisa seguir o formato "usuario@dominio.com"');
  })

  it('Deve validar senha vazio',() => {

    const inputEmail = cy.get('[formControlName = email]');
    const inputSenha = cy.get('[formControlName = senha]');

    inputSenha.focus();
    inputEmail.focus();

    cy.contains('A senha precisa ser preenchida');
  })

  it('Deve validar senha curta',() => {

    const inputSenha = cy.get('[formControlName = senha]');

    const inputEmail = cy.get('[formControlName = email]');

    inputSenha.type('AA');
    inputEmail.focus();

    cy.contains('A senha deve ter no mínimo 6 caracteres.');
  })

})
