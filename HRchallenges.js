const puppy = require("puppeteer");

let moderators = ["user1", "user2"];
async function openBrowser(){
  const browser = await  puppy.launch({
        headless : false,
        defaultViewport : false,
        // slowMo : 150,
        args:[
            '--start-maximized' //fullscr
        ]
    });
    let tabs = await browser.pages();
    
    let currTab = tabs[0];
    await currTab.goto("https://google.com")

    // browser.pages().then(function(tab){
    //     tab[0].goto("https://google.com");
    // })

    // for(let i = 0; i<9; i++){
    //     browser.newPage().then(function(tab){
    //        tab.goto("https://google.com")
    //     })
    // }

    // const tabs = await browser.pages();
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
    
    await tab.waitForNavigation({waitUntil: "networkidle2"})
    let dropdown = await tab.$('[data-analytics="NavBarProfileDropDown"]')
    await dropdown.click();

    let administrationbutton = await tab.$('[data-analytics="NavBarProfileDropDownAdministration"]');
    await administrationbutton.click();
     
    await tab.waitForSelector(".admin-tabbed-nav a");
    let administrationTabs = await tab.$$(".admin-tabbed-nav a");
    await administrationTabs[1].click();

    let createChallengeBtn = await tab.$(".btn.btn-green.backbone.pull-right");
    await createChallengeBtn.click();

    await tab.waitForSelector(".CodeMirror-line");
    
    let challengeName = await tab.$("#name");
    let challengePreview = await tab.$("#preview");
    let codeTextArea = await tab.$$(".CodeMirror-line");
    await challengeName.type("Coding");
    await challengePreview.type("bdjbe");
    for(let i = 0; i<codeTextArea.length; i++){
        await codeTextArea[i].click();
        await codeTextArea[i].type("Hey");
    }
    
    let tagsTextArea = await tab.$("#tags_tagsinput");
    await tagsTextArea.click();
    await tagsTextArea.type("Tag1");
    await tab.keyboard.press("Enter");

    let saveChangesBtn = await tab.$(".save-challenge.btn.btn-green");
    await saveChangesBtn.click();

    await tab.waitForSelector('[data-tab="moderators"]');
    let moderatorBtn = await tab.$('[data-tab="moderators"]');
    moderatorBtn.click();
    await tab.waitForSelector("#moderator");
    let moderatorTextArea = await tab.$("#moderators");
    for(let moderator of moderators){
        await moderatorTextArea.type(moderator);
        await tab.keyboard.press("Enter");
    }

    await tab.waitForSelector("save-challenge.btn.btn-green")
    saveChangesBtn = await tab.$(".save-challenge.btn.btn-green");
    await saveChangesBtn.click();

    
}
openBrowser();