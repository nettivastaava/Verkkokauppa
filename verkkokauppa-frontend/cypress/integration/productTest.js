describe('Registration ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#login').click()
    cy.get('#username').type('Harri')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.get('#products').click()
  })
  it('Categories and trending items are rendered correctly', function() {
    cy.contains('Two sizes too big, faded Taz t-shirt')
    cy.contains('clothing')
  })
  it('User can view product details', function() {
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
  it('User can filter products by name', function() {
    cy.contains('Color TV')
    cy.get('#nameFilter').type('Taz')

    cy.contains('Two sizes too big, faded Taz t-shirt')
    cy.contains('Color TV').should('not.exist')
  })
  it('User can filter products by name II', function() {
    cy.get('#nameFilter').type('Tax')

    cy.contains('Two sizes too big, faded Taz t-shirt').should('not.exist')
    cy.contains('Color TV').should('not.exist')
  })
})