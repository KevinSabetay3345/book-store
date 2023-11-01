describe('E2E Test', () => {
  beforeEach(() => {
    cy.intercept('https://www.googleapis.com/books/v1/volumes?maxResults=20&filter=free-ebooks&q=*', { fixture: 'free-books' })
      .as('getFreeBooks')
    cy.intercept('https://www.googleapis.com/books/v1/volumes?maxResults=20&filter=paid-ebooks&q=*', { fixture: 'paid-books' })
      .as('getPaidBooks')
    
    cy.visit('localhost:3000')
    cy.location("pathname").should("eq", "/")

    cy.wait(['@getFreeBooks', '@getPaidBooks'])
  })

  it('Testing search input', () => {

    cy.getDataTest('search-input').type('fake book')
    cy.getDataTest('search-input').should('have.value', 'fake book')
    cy.getDataTest('search-input').type('{enter}')
    cy.getDataTest('search-input').should('have.value', 'fake book')
    cy.location('pathname').should('equal', '/fake%20book')

    //Clean search input
    cy.getDataTest('categories').eq(0).click()
    cy.getDataTest('search-input').should('have.value', '')
    cy.getDataTest('categories').eq(0).then(($el) => {
      cy.location('pathname').should('equal', '/'+$el.val())      
    })
  })

  it('Testing order by', () => {

    cy.getDataTest('order-by').should('have.value', 'default')
    cy.getDataTest('order-by').select('OLD')
    cy.getDataTest('order-by').should('have.value', 'OLD')

    //Clean order by
    cy.getDataTest('categories').eq(0).click()
    cy.getDataTest('categories').eq(0).then(($el) => {
      cy.location('pathname').should('equal', '/'+$el.val())      
    })
    cy.getDataTest('order-by').should('have.value', 'default')
    cy.getDataTest('order-by').select('NEW')
    cy.getDataTest('order-by').should('have.value', 'NEW')

    cy.getDataTest('search-input').type('fake{enter}')
    cy.location('pathname').should('equal', '/fake')

    cy.getDataTest('order-by').should('have.value', 'default')
    cy.getDataTest('order-by').select('NEW')
    cy.getDataTest('order-by').should('have.value', 'NEW')
  })
  
  it('Testing modal', () => {

    cy.getDataTest('book-cover').should('have.length', 40)
    cy.getDataTest('book-modal').should('not.exist')

    cy.getDataTest('order-by').select('HIGH_PRICE')
    cy.wait(1000)

    //Open first book, add to cart, close modal
    cy.getDataTest('book-cover').eq(0).click()  
    cy.getDataTest('go-to-cart').should('not.exist')
    cy.getDataTest('book-modal')
    cy.getDataTest('add-to-cart').click()
    cy.getDataTest('go-to-cart')
    cy.getDataTest('close-modal').click()
    cy.getDataTest('book-modal').should('not.exist')
    cy.wait(1000)

    //Open same book, check is added, close modal
    cy.getDataTest('book-cover').eq(0).click()
    cy.getDataTest('book-modal')
    cy.getDataTest('go-to-cart')
    cy.getDataTest('close-modal').click()
    cy.wait(1000)

    //Open second book, do not add, close modal
    cy.getDataTest('book-cover').eq(1).click()
    cy.getDataTest('book-modal')
    cy.getDataTest('add-to-cart')
    cy.getDataTest('go-to-cart').should('not.exist')
    cy.getDataTest('close-modal').click()
    cy.wait(1000)

    //Open same book, check is not added, close modal
    cy.getDataTest('book-cover').eq(1).click()
    cy.getDataTest('book-modal')
    cy.getDataTest('add-to-cart')
    cy.getDataTest('go-to-cart').should('not.exist')
    cy.getDataTest('close-modal').click()
    cy.wait(1000)

    //Open free book, check is free, close modal
    cy.getDataTest('book-cover').eq(20).click()
    cy.getDataTest('book-modal')
    cy.getDataTest('go-to-cart').should('not.exist')
    cy.getDataTest('open-free-book')
    cy.getDataTest('close-modal').click()
    cy.getDataTest('book-modal').should('not.exist')

  })

  it('Testing cart', () => {
    
    cy.getDataTest('order-by').select('HIGH_PRICE')
    cy.wait(1000)
    
    //Add book to cart, go to cart, delete book, check cart is empty
    cy.getDataTest('cart-item').should('not.exist')
    cy.getDataTest('book-cover').eq(0).click()
    cy.getDataTest('book-modal')
    cy.getDataTest('add-to-cart').click()
    cy.wait(1000)

    cy.getDataTest('cart-item').should('not.exist')
    cy.getDataTest('go-to-cart').click()
    cy.location('pathname').should('equal', '/cart')
    cy.getDataTest('cart-item').should('have.length', 1)
    cy.wait(1000)

    cy.getDataTest('delete-item').eq(0).click()
    cy.getDataTest('cart-item').should('not.exist')
    cy.getDataTest('delete-item').should('not.exist')
    cy.wait(1000)

    //Add 3 books to cart, go to cart, delete 1 book, check cart has 2 books
    cy.getDataTest('search-input').type('JavaScript{enter}')
    cy.location('pathname').should('equal', '/JavaScript') 
    cy.wait(['@getFreeBooks', '@getPaidBooks'])

    cy.getDataTest('order-by').select('HIGH_PRICE')
    cy.wait(1000)

    cy.getDataTest('book-cover').eq(0).click()
    cy.getDataTest('add-to-cart').click()
    cy.getDataTest('close-modal').click()
    cy.wait(1000)

    cy.getDataTest('book-cover').eq(1).click()
    cy.getDataTest('add-to-cart').click()
    cy.getDataTest('close-modal').click()
    cy.wait(1000)
    
    cy.getDataTest('book-cover').eq(2).click()
    cy.getDataTest('add-to-cart').click()
    cy.getDataTest('go-to-cart').click()
    cy.location('pathname').should('equal', '/cart')
    cy.getDataTest('cart-item').should('have.length', 3)
    cy.getDataTest('delete-item').should('have.length', 3)

    cy.getDataTest('delete-item').eq(1).click()
    cy.getDataTest('cart-item').should('have.length', 2)
    cy.getDataTest('delete-item').should('have.length', 2)

  })
  //TO BE CONTINUED...
})