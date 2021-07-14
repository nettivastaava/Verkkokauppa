describe('Registration ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page is rendered correctly', function() {
      cy.contains('Pennywise Web Store')
      cy.contains('products')
  })
  it('user can navigate to login form', function() {
    cy.get('#login').click()
    cy.contains('Login')
  })
  it('login fails with invalid credentials', function() {
    cy.get('#login').click()
    
    cy.get('#username').type('Invalid')
    cy.get('#password').type('invalid1')
    cy.get('#login-button').click()
    
    cy.contains('Invalid credentials')
  })
})