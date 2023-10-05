const playwright = require('@playwright/test');
exports.LoginPage = class LoginPage {

    constructor(page)
    {
            this.page = page;
            this.userName = page.locator("#user-name");
            this.password = page.locator('[name="password"]');
            this.submitbutton = page.locator(".submit-button.btn_action")
    
    }
    
        async gotourl()
        {
            await this.page.goto("https://saucedemo.com/")
        }
    
        async correctusername(username,password)
        {
            
            await this.userName.type(username)
            await this.password.type(password)
            await this.submitbutton.click()
           /* await Promise.all(
                [
                     this.page.waitForNavigation(),
                     ,
                ]
            );*/
            
        }
    }

    
