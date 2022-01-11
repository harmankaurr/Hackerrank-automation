const puppy = require("puppeteer");

let moderators = ["user1", "user2"];
async function openBrowser() {
    const browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        // slowMo : 150,
        args: [
            '--start-maximized' //fullscr
        ]
    });
    // let tabs = await browser.pages();

    // let currTab = tabs[0];
    // await currTab.goto("https://google.com")

    // browser.pages().then(function(tab){
    //     tab[0].goto("https://google.com");
    // })

    // for(let i = 0; i<9; i++){
    //     browser.newPage().then(function(tab){
    //        tab.goto("https://google.com")
    //     })
    // }

    const tabs = await browser.pages();
    const tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    let usernameInput = await tab.$("#input-1");
    let passwordInput = await tab.$("#input-2");
    let rememberCheckbox = await tab.$(".checkbox-input");
    let loginButton = await tab.$('[data-analytics="LoginPassword"]');

    await usernameInput.type("cigovi5288@ehstock.com");
    await passwordInput.type("TempMail");
    await rememberCheckbox.click();
    await loginButton.click();


    // await tab.waitForSelector('[data-analytics="StartPreparation"]');
    // let startPreparationBtn = await tab.$('[data-analytics="StartPreparation"]');
    // await startPreparationBtn.click();

    await tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    await tab.click('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled');
  

    await tab.waitForSelector('[data-attr2="one-month-preparation-kit"]');
    let solveChallengeBtns = await tab.$$('[data-attr2="one-month-preparation-kit"]');
    console.log(solveChallengeBtns.length);

    let solveChallengeUrls = [];
    // for (let solveChallengeBtn of solveChallengeBtns) {
    //     solveChallengeUrls.push(await tab.evaluate((ele) => {
    //         return "https://www.hackerrank.com" + ele.getAttribute("href");
    //     }, solveChallengeBtns[0])
    //     );
    // }

    solveChallengeUrls.push(await tab.evaluate((ele) => {
        return "https://www.hackerrank.com" + ele.getAttribute("href");
    }, solveChallengeBtns[0])
    );

    solveChallengeUrls.push(await tab.evaluate((ele) => {
        return "https://www.hackerrank.com" + ele.getAttribute("href");
    }, solveChallengeBtns[2])
    );

    for(let i = 0; i<solveChallengeUrls.length; i++){
        await solveChallenge(solveChallengeUrls[i], tab);
    }

    // await browser.close();

    // await tab.$$eval('[data-event-label="SolvePrepKitChallenge"]', (solveChallengeBtns) => {
    //   solveChallengeBtns.map((solveChallengeBtn)=>{
    //   console.log
    //   })
    // });
}

async function solveChallenge(url, tab){
    let problemUrl = url.replace("?", "/problem?");
    let editorialUrl =  url.replace("?", "/editorial?")

    await tab.goto(editorialUrl);
    let solutionsH3Tags = await tab.$$(".hackdown-content h3");
    // console.log(solutionsH3Tags.length);
    let solutionLanguages = [];
    for(let solutionsH3Tag of solutionsH3Tags){
        solutionLanguages.push(await tab.evaluate(function(ele){
            return ele.innerText;
        }, solutionsH3Tag)
        )
    }
let solutionsPreTags = await tab.$$(".highlight pre");
let solution;
for(let i = 0; i<solutionLanguages.length; i++){
    if(solutionLanguages[i] == "C++"){
        solution = await tab.evaluate(function(ele){
             return ele.innerText;
        },solutionsPreTags[i]);
        break;
    }
}
    await tab.goto(problemUrl);
    await tab.waitForSelector(".view-lines");
    await tab.click('[type="checkbox"]');
    await tab.type('#input-1', solution);
    // await tab.click(".view-lines");
    // await tab.type(".view-lines", "hello");
    await tab.keyboard.down("Control");
    await tab.keyboard.press("A");
    await tab.keyboard.press("X");
    await tab.keyboard.up("Control");
    await tab.click(".view-lines");
    await tab.keyboard.down("Control");
    await tab.keyboard.press("A");
    await tab.keyboard.press("V");
    await tab.keyboard.up("Control");

    // await tab.type(".view-lines", solution);
    await tab.click(".hr-monaco-submit");
    await tab.waitForSelector(".congrats-wrapper");
    
    
}
openBrowser();