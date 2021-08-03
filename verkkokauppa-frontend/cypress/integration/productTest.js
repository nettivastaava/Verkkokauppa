describe('Registration ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#login').click()
    cy.get('#username').type('Harri')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  })
  it('Categories and trending items are rendered correctly', function() {
    cy.get('#products').click()
    cy.contains('Two sizes too big, faded Taz t-shirt')
    cy.contains('clothing')
  })
  it('User can view product details', function() {
    cy.get('#products').click()
    cy.get('#ff28rj292fkfljf92').click()
    
    cy.contains('Guaranteed to be ill-fitting')
    cy.contains('Review this product')
    /*
    cy.get('#grade').type('2')
    cy.get('#commentField').type('Oli ihan liian piukka')
    cy.get('#submitReview').click()

    cy.contains('Harri gave grade 2 and commented:')
    */
  })
})