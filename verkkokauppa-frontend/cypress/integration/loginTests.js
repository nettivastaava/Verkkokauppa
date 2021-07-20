describe('Login ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#login').click()
  })
  it('Login form is correctly rendered', function() {
    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
  })
  it('Login fails with invalid credentials', function() {
    cy.get('#username').type('Invalid')
    cy.get('#password').type('notValid')
    cy.get('#login-button').click()

    cy.contains('Invalid credentials')
  })
  it('Login succeeds with correct credentials', function() {
    cy.get('#username').type('Harri')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('logout')
  })
})