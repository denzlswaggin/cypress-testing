
const REPO_PATH = '/denzlswaggin/medieval-massacre';

Cypress.Commands.add('openRepoTab', (tabSelector) => {
    cy.visit(REPO_PATH);
    cy.get(tabSelector).should('be.visible').click();
});


describe('Code tab', () => {

    beforeEach(() => {
        cy.openRepoTab('#code-tab');
    });

    it('Opens file browser with repo content', () => {
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

    it('Branches dropdown shows correct branches and redirects to /branches', () => {
        cy.get('#ref-picker-repos-header-ref-selector')
            .should('be.visible')
            .click();

        cy.contains('a', 'View all branches')
            .should('be.visible')
            .click();

        cy.url().should('include', '/branches');
    });

    it('Filter Active branches works', () => {
        cy.visit(`${REPO_PATH}/branches`);

        cy.contains('a', 'Active').should('be.visible').click();
        cy.url().should('include', '/branches/active');
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

    it('Filter Stale branches works', () => {
        cy.visit(`${REPO_PATH}/branches`);

        cy.contains('a', 'Stale').should('be.visible').click();
        cy.url().should('include', '/branches/stale');
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

    it('Filter All branches works', () => {
        cy.visit(`${REPO_PATH}/branches`);

        cy.contains('a', 'All').should('be.visible').click();
        cy.url().should('include', '/branches/all');
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

});


describe('Issues tab', () => {

    beforeEach(() => {
        cy.openRepoTab('#issues-tab');
    });

    it('URL contains /issues after clicking on the tab', () => {
        cy.url().should('include', '/issues');
    });

    it('Content of Issues page is visible', () => {
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

    it('Labels tab — dropdown opens', () => {
        cy.get('div[data-action-bar-item="labels"]')
            .should('be.visible')
            .click();

        cy.get('[data-action-bar-item="labels"].selected, .SelectMenu, [role="menu"]')
            .should('exist');
    });

    it('Projects tab — dropdown opens', () => {
        cy.get('div[data-action-bar-item="projects"]')
            .should('be.visible')
            .click();

        cy.get('[data-action-bar-item="projects"].selected, .SelectMenu, [role="menu"]')
            .should('exist');
    });

    it('Milestones tab — dropdown opens', () => {
        cy.get('div[data-action-bar-item="milestones"]')
            .should('be.visible')
            .click();

        cy.get('[data-action-bar-item="milestones"].selected, .SelectMenu, [role="menu"]')
            .should('exist');
    });

    it('Assignees tab — dropdown opens', () => {
        cy.get('div[data-action-bar-item="assignees"]')
            .should('be.visible')
            .click();

        cy.get('[data-action-bar-item="assignees"].selected, .SelectMenu, [role="menu"]')
            .should('exist');
    });

    it('Sort-by tab — dropdown opens', () => {
        cy.get('div[data-action-bar-item="sort-by"]')
            .should('be.visible')
            .click();

        cy.get('[data-action-bar-item="sort-by"].selected, .SelectMenu, [role="menu"]')
            .should('exist');
    });

});


describe('Pull Requests tab', () => {

    beforeEach(() => {
        cy.openRepoTab('#pull-requests-tab');
    });

    it('URL contains /pulls after clicking on the tab', () => {
        cy.url().should('include', '/pulls');
    });

    it('Content of PR page is visible', () => {
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

    it('The link to the Labels page exists and is functional.', () => {
        cy.get('a[href$="/labels"]').first().should('be.visible').click();

        cy.url().should('include', '/labels');
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

    it('The link to the Milestones page exists and is functional.', () => {
        cy.visit(`${REPO_PATH}/pulls`);
        cy.get('a[href$="/milestones"]')
            .first()
            .should('be.visible')
            .click();

        cy.url().should('include', '/milestones');
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

});


describe('Actions tab', () => {

    beforeEach(() => {
        cy.openRepoTab('#actions-tab');
    });

    it('URL contains /actions after clicking on the tab', () => {
        cy.url().should('include', '/actions');
    });

    it('Content of Actions page is visible', () => {
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

    it('Documentation link redirects to the correct page', () => {
        cy.contains('a', 'Learn more about getting started with Actions.')
            .should('be.visible')
            .and('have.attr', 'href', 'https://docs.github.com/articles/getting-started-with-github-actions');
    });

});


describe('Projects tab', () => {

    beforeEach(() => {
        cy.openRepoTab('#projects-tab');
    });

    it('URL contains /projects after clicking on the tab', () => {
        cy.url().should('include', '/projects');
    });

    it('Sort dropdown can be open and selecting "Oldest" works', () => {
        cy.get('.Button-label')
            .contains('Sort')
            .should('be.visible')
            .click();

        cy.get('.select-menu-item-text')
            .contains('Oldest')
            .should('be.visible')
            .click();

        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

});


describe('Security tab', () => {

    beforeEach(() => {
        cy.openRepoTab('#security-tab');
    });

    it('URL contains /security after clicking on the tab', () => {
        cy.url().should('include', '/security');
    });

    it('Content of Security page is visible', () => {
        cy.get('#repo-content-turbo-frame').should('be.visible');
    });

});


describe('Insights tab — menu content', () => {

    const insightsMenuItems = [
        { label: 'Contributors', urlPart: '/graphs/contributors' },
        { label: 'Community standards', urlPart: '/community' },
        { label: 'Commits', urlPart: '/graphs/commit-activity' },
        { label: 'Code frequency', urlPart: '/graphs/code-frequency' },
        { label: 'Dependency graph', urlPart: '/network/dependencies' },
        { label: 'Network', urlPart: '/network', skipContentCheck: true },
        { label: 'Forks', urlPart: '/forks' },
    ];

    insightsMenuItems.forEach(({ label, urlPart, skipContentCheck }) => {

        it(`"${label}" — redirects to the correct URL and displays the content`, () => {

            cy.visit(`${REPO_PATH}/pulse`);

            cy.get('nav.menu').should('be.visible');
            cy.get('nav.menu').contains('a', label).should('be.visible').click();

            cy.url().should('include', urlPart);

            if (!skipContentCheck) {
                cy.get('#repo-content-turbo-frame').should('be.visible');
            }
        });

    });

});