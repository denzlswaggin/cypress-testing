describe('Main page test', () => {
    it('Main page loads', () => {
        cy.visit('/');
        cy.title().should('include', 'GitHub');
    });
});

describe('Navigation dropdown test', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Platform dropdown displaying correct content', () => {
        cy.contains('button', 'Platform')
            .should('be.visible')
            .click();

        cy.contains('button', 'Platform')
            .should('have.attr', 'aria-expanded', 'true');

        cy.get('[aria-expanded="true"]')
            .closest('li')
            .within(() => {
                cy.get('a[href*="features/copilot"]')
                    .should('exist')
                    .and('have.attr', 'href');

                cy.get('a[href*="features/issues"]')
                    .should('exist')
                    .and('have.attr', 'href');
            });

    });

    it('Solutions dropdown displaying correct content', () => {
        cy.contains('button', 'Solutions')
            .should('be.visible')
            .click();

        cy.contains('button', 'Solutions')
            .should('have.attr', 'aria-expanded', 'true');

        cy.get('[aria-expanded="true"]')
            .closest('li')
            .within(() => {
                cy.get('a[href*="enterprise"]')
                    .should('exist')
                    .and('have.attr', 'href');

                cy.get('a[href*="ci-cd"]')
                    .should('exist')
                    .and('have.attr', 'href');
            });
    });

    it('Resources dropdown displaying correct content', () => {
        cy.contains('button', 'Resources')
            .should('be.visible')
            .click();

        cy.contains('button', 'Resources')
            .should('have.attr', 'aria-expanded', 'true');

        cy.get('[aria-expanded="true"]')
            .closest('li')
            .within(() => {
                cy.get('a[href*="articles?topic=devops"]')
                    .should('exist')
                    .and('have.attr', 'href');

                cy.get('a[href*="customer-stories"]')
                    .should('exist')
                    .and('have.attr', 'href');
            });
    });

    it('Open source dropdown displaying correct content', () => {
        cy.contains('button', 'Open Source')
            .should('be.visible')
            .click();

        cy.contains('button', 'Open Source')
            .should('have.attr', 'aria-expanded', 'true');

        cy.get('[aria-expanded="true"]')
            .closest('li')
            .within(() => {
                cy.get('a[href*="securitylab.github.com"]')
                    .should('exist')
                    .and('have.attr', 'href');

                cy.get('a[href*="trending"]')
                    .should('exist')
                    .and('have.attr', 'href');
            });
    });

    it('Enterprise dropdown displaying correct content', () => {
        cy.contains('button', 'Enterprise')
            .should('be.visible')
            .click();

        cy.contains('button', 'Enterprise')
            .should('have.attr', 'aria-expanded', 'true');

        cy.get('[aria-expanded="true"]')
            .closest('li')
            .within(() => {
                cy.get('a[href*="features/copilot/copilot-business"]')
                    .should('exist')
                    .and('have.attr', 'href');

                cy.get('a[href*="enterprise"]')
                    .should('exist')
                    .and('have.attr', 'href');
            });

    });

    it('Pricing button redirects to /pricing correctly', () => {
        cy.get('a[href*="/pricing"]')
            .first()
            .should('be.visible')
            .click();

        cy.url().should('include', '/pricing');
        cy.get('#repo-content-turbo-frame, main').should('be.visible');
    });
});

describe('Search test', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Search input is visible/works', () => {
        cy.get('[data-target="qbsearch-input.inputButton"]')
            .should('be.visible')
            .click();

        cy.get('#query-builder-test')
            .should('be.visible');
    })

    it('Search redirects to correct URL', () => {
        cy.get('[data-target="qbsearch-input.inputButton"]')
            .should('be.visible')
            .click();

        cy.get('#query-builder-test')
            .should('be.visible')
            .type('Security{enter}');

        cy.url().should('include', '/search');
        cy.url().should('include', 'Security');
        cy.get('main').should('be.visible');
    });
})

describe('Footer test', () => {
    it('Footer contains key links', () => {
        cy.visit('/');
        cy.get('footer').should('be.visible');
        cy.get('footer a[href*="/about"]').should('exist');
        cy.get('footer a[href*="/docs"]').should('exist');
        cy.get('footer a[href*="/resources/articles/devops-tools-comparison"]').should('exist');
    });
});