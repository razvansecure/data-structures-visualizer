var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.firefox()).
build();

async function testQuiz(){
driver.get('http://localhost:3000/linkedlist');
    var quizButton = driver.findElement(webdriver.By.xpath('/html/body/div/div/main/div[2]/div/div[2]/div/div/button'))
    quizButton.click()
    .then(async() => {
        var list = await driver.findElements(webdriver.By.className('node'))
        return list.length-1
    })
    .then((val) => driver.findElement(webdriver.By.xpath('//*[@id=":r7:"]')).sendKeys(val))
    .then(() => driver.findElement(webdriver.By.xpath('/html/body/div/div/main/div[2]/div/div[2]/div/div/div[1]/button')).click())
    .then(async() => {
        let text = await driver.findElement(webdriver.By.xpath('//*[@id="currentQuizQuestion"]')).getText()
        let textParts = text.split(' ')
        let questionValue = textParts[textParts.length-1]
        let list = await driver.findElements(webdriver.By.className('node'))
        for(let i = 0; i < list.length; i++){
            if(await list[i].getText() === questionValue)
                return i
        }
    })
    .then((val) => {driver.findElement(webdriver.By.xpath('//*[@id=":r7:"]')).clear()
        return val
    })
    .then(async(val) => {await new Promise(r => setTimeout(r, 2000))
        return val
    })
    .then((val) => driver.findElement(webdriver.By.xpath('//*[@id=":r7:"]')).sendKeys(val))
    .then(() => driver.findElement(webdriver.By.xpath('/html/body/div/div/main/div[2]/div/div[2]/div/div/div[1]/button')).click())
    .then(async() => {
        let text = await driver.findElement(webdriver.By.xpath('//*[@id="currentQuizQuestion"]')).getText()
        let textParts = text.split(' ')
        let questionValue = textParts[textParts.length-1]
        let list = await driver.findElements(webdriver.By.className('node'))
        for(let i = 0; i < list.length; i++){
            if(await list[i].getText() === questionValue)
                return Math.max(0,i - 1)
        }
    })
    .then((val) => {driver.findElement(webdriver.By.xpath('//*[@id=":r7:"]')).clear()
        return val
    })
    .then(async(val) => {await new Promise(r => setTimeout(r, 2000))
        return val
    })
    .then((val) => driver.findElement(webdriver.By.xpath('//*[@id=":r7:"]')).sendKeys(val))
    .then(() => driver.findElement(webdriver.By.xpath('/html/body/div/div/main/div[2]/div/div[2]/div/div/div[1]/button')).click())
    .then(async() => {
        let currentScoreText = await driver.findElement(webdriver.By.xpath('//*[@id="currentScore"]')).getText()
        assert.equal(currentScoreText, "Your score is 3/3")
    })
    .then(async() => {await new Promise(r => setTimeout(r, 2000))
    })
    .then(() => driver.quit())
}

async function testQuizQueue(){
    driver.get('http://localhost:3000/queue');
        var quizButton = driver.findElement(webdriver.By.xpath('/html/body/div/div/main/div[2]/div/div[2]/div/div/button'))
        quizButton.click()
        .then(async() => {
            var list = await driver.findElements(webdriver.By.className('node'))
            return list[3].getText()
        })
        .then((val) => driver.findElement(webdriver.By.xpath('//*[@id=":r3:"]')).sendKeys(val))
        .then(() => driver.findElement(webdriver.By.xpath('//*[@id="answerButton"]')).click())
        .then(async() => {
            var list = await driver.findElements(webdriver.By.className('node'))
            return list[2].getText()
        })
        .then((val) => {driver.findElement(webdriver.By.xpath('//*[@id=":r3:"]')).clear()
            return val
        })
        .then(async(val) => {await new Promise(r => setTimeout(r, 2000))
            return val
        })
        .then((val) => driver.findElement(webdriver.By.xpath('//*[@id=":r3:"]')).sendKeys(val))
        .then(() => driver.findElement(webdriver.By.xpath('//*[@id="answerButton"]')).click())
        .then(async() => {
            let currentScoreText = await driver.findElement(webdriver.By.xpath('//*[@id="currentScore"]')).getText()
            assert.equal(currentScoreText, "Your score is 2/2")
        })
        .then(async() => {await new Promise(r => setTimeout(r, 2000))
        })
        .then(() => driver.quit())
}

testQuiz()
//testQuizQueue()