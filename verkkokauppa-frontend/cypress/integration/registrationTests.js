describe('Registration ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#login').click()
    cy.get('#register-link').click()
  })
  it('registration form is rendered correctly', function() {
    cy.contains('Create a new account')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('password confirmation:')
  })
  it('registration fails with too short password', function() {
    cy.get('#username').type('Harri')
    cy.get('#password').type('salaine')
    cy.get('#passwordConf').type('salaine')
    cy.get('#register-button').click()
    
    cy.contains('Registration failed')
  })
  it('registration fails when password does not match the confirmation', function() {
    cy.get('#username').type('Harri')
    cy.get('#password').type('salainen')
    cy.get('#passwordConf').type('salainem')
    cy.get('#register-button').click()
    
    cy.contains('Registration failed')
  })
  it('registration works with proper input', function() {
    cy.get('#username').type('Harri')
    cy.get('#password').type('salainen')
    cy.get('#passwordConf').type('salainen')
    cy.get('#register-button').click()
    
    cy.contains('Login')
  })
})