module.exports = {
    'PASSO 1: ACESSAR a página de autenticação ': function(browser) {

        browser
            .resizeWindow(1300,900)
            .url("http://localhost:8080")
            .waitForElementVisible('body')
            .assert.titleContains('Ferrari - Hcode Lab')
            .assert.visible('#header > div.menu > div > a')
            .click('#header > div.menu > div > a')
            .pause(1000)
            .end()
        
    },
    'PASSO 2: Tentar fazer cadastro ': function(browser) {

        browser
            .waitForElementVisible('body')
            .assert.visible('#auth-email > div.actions > a')
            .click('#auth-email > div.actions > a')
            .pause(3000)
    },
    'PASSO 1: Verificar se autenticou após o cadastro': function(browser) {

    },
    
}