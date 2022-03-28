const faker = require('faker');

describe('Edit exiting People information in the account', () => {
    let people;

    before(() => {
        cy.registerUser();
        cy.login();
        cy.navigation('People');
        cy.getPersonObj().then((personObj) => {
            people = personObj;
            cy.addPeople(people);
        });
    });

    beforeEach(() => {
        cy.login();
        cy.injectAxe();
        cy.navigation('People');
        cy.checkAccessibility();
        cy.url().should('include', '/people');
    });

    it('Should be able to edit existing people information and save', () => {
        cy.contains('a', people.lastName).click();
        cy.checkAccessibility();
        people.firstName = `Auto-${faker.name.firstName()}`;
        people.lastName = faker.name.lastName();
        people.personType = 'Employed Crew';
        people.travelDocType = 'IdentityCard';
        people.documentNumber = faker.datatype.number();
        people.issuingState = 'AUS';
        people.personTypeValue = 'Crew';

        const expectedPerson = [
            {
                'Last Name': `Last Name${people.lastName}`,
                'First Name': `First Name${people.firstName}`,
                'Type': `Type${people.personType}`,
            }
        ];
        cy.get('input[name="firstName"]').clear().type(people.firstName);
        cy.get('input[name="lastName"]').clear().type(people.lastName);
        cy.get('[type="radio"]').check(people.personTypeValue).should('be.checked');
        cy.get('[type="radio"]').check(people.travelDocType).should('be.checked');
        cy.get('input[name="documentNumber"]').clear().type(people.documentNumber);
        cy.get('input[name="documentIssuingState"]').clear().type(people.issuingState);
        cy.get('.govuk-button').contains('Add to saved people list').click();
        cy.get('.govuk-error-message').should('not.exist');

        cy.get('table').getTable().then((peopleData) => {
            expect(peopleData).to.not.be.empty;
            expectedPerson.forEach((item) => expect(peopleData).to.deep.include(item));
        });

        cy.contains('a', people.lastName).click();

        cy.get('input[name="documentNumber"]').should('have.value', people.documentNumber);
        cy.get('input[name="documentIssuingState"]').should('have.value', people.issuingState);
        cy.checkAccessibility();
    });

    it('Should be able to edit existing people information and NOT save', () => {
        cy.contains('a', people.lastName).click();
        cy.checkAccessibility();
        people.travelDocType = 'Passport';
        people.documentNumber = faker.datatype.number();
        people.issuingState = 'CUB';

        const expectedPerson = [
            {
                'Last Name': `Last Name${people.lastName}`,
                'First Name': `First Name${people.firstName}`,
                'Type': `Type${people.personType}`,
            }
        ];
        cy.get('input[name="firstName"]').clear().type(`Auto-${faker.name.firstName()}`);
        cy.get('input[name="lastName"]').clear().type(faker.name.lastName());
        cy.get('[type="radio"]').check(people.personTypeValue).should('be.checked');
        cy.get('[type="radio"]').check(people.travelDocType).should('be.checked');
        cy.get('input[name="documentNumber"]').clear().type(people.documentNumber);
        cy.get('input[name="documentIssuingState"]').clear().type(people.issuingState);
        cy.get('.govuk-link--no-visited-state').click();
        cy.get('.govuk-error-message').should('not.exist');

        cy.get('table').getTable().then((peopleData) => {
            expect(peopleData).to.not.be.empty;
            expectedPerson.forEach((item) => expect(peopleData).to.deep.include(item));
        });

        cy.contains('a', people.lastName).click();

        cy.get('input[name="documentNumber"]').should('not.have.value', people.documentNumber);
        cy.get('input[name="documentIssuingState"]').should('not.have.value', people.issuingState);
    });

    after(() => {
        cy.deleteAllEmails();
        cy.removeTestData();
    });
});
