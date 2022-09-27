describe('Recipes App', () => {
  it('Login', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="login-submit-btn"]');
    
    cy.get('[data-testid="email-input"]').type('test@test.com')
    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');
    cy.get('[data-testid="password-input"]').type('123456789');
    cy.get('[data-testid="login-submit-btn"]').should('not.be.disabled');
    cy.get('[data-testid="login-submit-btn"]').click();
  });
  it('Foods', () => {
    cy.visit('http://localhost:3000/foods');
    
    for(let i = 0; i < 12; i++) {
      cy.get(`[data-testid="${i}-card-img"]`)
    }
    cy.get('[data-testid="0-card-img"]').click();
  });
  it('Drinks', () => {
    cy.visit('http://localhost:3000/drinks');
    
    for(let i = 0; i < 12; i++) {
      cy.get(`[data-testid="${i}-card-img"]`)
    }
    cy.get('[data-testid="0-card-img"]').click();
  });
  it('Recipes in progress', () => {
    cy.visit('http://localhost:3000/foods/52977');
    cy.get('[data-testid="start-recipe-btn"]').click()
    cy.get('[data-testid="finish-recipe-btn"]').should('be.disabled');
    
    for(let i = 0; i < 13; i++) {
      cy.get(`[data-testid="${i}-ingredient-input"]`).click();
    }
    cy.get('[data-testid="finish-recipe-btn"]').click();
  });
  it('Done Recipes', () => {
    const doneRecipes = [{"id":"52977","type":"food","nationality":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg","doneDate":"26/9/2022","tags":["Soup"]}]
    cy.visit('http://localhost:3000/done-recipes');
    
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    cy.get('[data-testid="0-horizontal-image"]');
    cy.get('[data-testid="filter-by-all-btn"]');
    cy.get('[data-testid="filter-by-food-btn"]');
    cy.get('[data-testid="filter-by-drink-btn"]');
    
    cy.get('.icons-container > :nth-child(1) > svg').click();

  });
  it('Favorite Recipes', () => {
    const favoriteRecipes = [{"id":"53065","type":"food","nationality":"Japanese","category":"Seafood","alcoholicOrNot":"","name":"Sushi","image":"https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg"}]
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    cy.visit('http://localhost:3000/favorite-recipes');
    
    cy.get('.icons-container > :nth-child(2) > svg').click();
    cy.stub(navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
    cy.get('[data-testid="linkCopied"]').should('be.visible')
  });
  it('Profile', () => {
    cy.login()
    cy.visit('http://localhost:3000/profile');
    cy.get('[data-testid="profile-email"]');
  });
  it('SearchBar', () => {
    cy.login()
    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="search-input"]').type("A");
    cy.get('[for="letter-search"]').click();
    cy.get('[data-testid="exec-search-btn"]').click();
    for(let i = 0; i < 4; i++) {
      cy.get(`[data-testid="${i}-card-img"]`)
    }
    cy.get('[href="/drinks"] > svg').click();
    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="search-input"]').type("A");
    cy.get('[for="letter-search"]').click();
    cy.get('[data-testid="exec-search-btn"]').click();
    for(let i = 0; i < 11; i++) {
      cy.get(`[data-testid="${i}-card-img"]`);
    }
  });
  it('Header', () => {
    cy.login()
    cy.visit('http://localhost:3000/foods');
    cy.get('[data-testid="profile-top-btn"]');
    cy.get('[data-testid="page-title"]');
    cy.get('[data-testid="search-top-btn"]');
  });
  it('Footer', () => {
    cy.login()
    cy.visit('http://localhost:3000/foods');
    cy.get('[href="/foods"] > svg > path');
    cy.get('[href="/drinks"] > svg > path');
    cy.get('[href="/favorite-recipes"] > svg');
    cy.get('[href="/done-recipes"] > svg');
  });
});
