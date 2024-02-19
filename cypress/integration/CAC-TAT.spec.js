// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() { //antes de executar cada it
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName')
            .type("João Pedro")
        cy.get('#lastName')
            .type("Brunoni")
        cy.get('#email')
            .type("jpbrunoni@gmail.com")
        cy.get('#open-text-area')
            .type(longText,{delay:0})
        cy.get('button[type="submit"]')
            .click()
        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName')
            .type("João Pedro")
        cy.get('#lastName')
            .type("Brunoni")
        cy.get('#email')
            .type("jpbrunonigmail.com")
        cy.get('#open-text-area')
            .type("Gostaria de validar algumas coisas!")
        cy.get('button[type="submit"]')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('se um valor não-numérico for digitado no campo telefone, o valor permanece vazio', function(){
        cy.get('#phone')
            .type('abc8defghij')
            .should('have.value','8')       
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName')
            .type("João Pedro")
        cy.get('#lastName')
            .type("Brunoni")
        cy.get('#email')
            .type("jpbrunoni@gmail.com")
        cy.get('#phone-checkbox')
            .check()
        cy.get('#open-text-area')
            .type("Gostaria de validar algumas coisas!")
        cy.get('button[type="submit"]')
            .click()            
        cy.get('.error')
            .should('be.visible')
    })

    it.only('preencha e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type("João Pedro")
            .should("have.value","João Pedro")
            .clear()
            .should("have.value","")
        cy.get('#lastName')
            .type("Brunoni")
            .should("have.value","Brunoni")
            .clear()
            .should("have.value","")
        cy.get('#email')
            .type("jpbrunoni@gmail.com")
            .should("have.value","jpbrunoni@gmail.com")
            .clear()
            .should("have.value","")
        cy.get('#phone')
            .type('4912345678')
            .should("have.value","4912345678")
            .clear()
            .should("have.value","")
    })


  })