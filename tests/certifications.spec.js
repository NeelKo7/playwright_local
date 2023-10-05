const { chromium } = require('@playwright/test')
const {test,expect} = require('@playwright/test')


test.describe("Lambdatest 101 Certification",async(capability)=>{
  
    let page;
    let browser;

    test.beforeEach(async({})=>{

        const capabilities = [{
            'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
            'browserVersion': 'latest',
            'LT:Options': {
              'platform': 'Windows 10',
              'build': 'Playwright Sample Build',
              'name': 'Playwright Chrome Test',
              'user': "neelkonar7",
              'accessKey': "e27AHnmnlz3IWO6akqxT6y6atfnLgGWsVEgt0d6NJiA7zcszbF",
              'network': true,
              'video': true,
              'console': true
            }
          },
          {
            'browserName': 'pw-webkit', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
            'browserVersion': 'latest',
            'LT:Options': {
              'platform': 'MAC OS',
              'build': 'Playwright Sample Build',
              'name': 'Playwright WebKit Test',
              'user': "neelkonar7",
              'accessKey': "e27AHnmnlz3IWO6akqxT6y6atfnLgGWsVEgt0d6NJiA7zcszbF",
              'network': true,
              'video': true,
              'console': true
            }
          }

        ]

        capabilities.forEach(async (capability) => {
            await parallelTests(capability)
          })
        
        
        browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
        })
        page = await browser.newPage()
        await page.goto("https://www.lambdatest.com/selenium-playground/")

        console.log('Initialising test:: ', capability['LT:Options']['name'])

    })
    

    test.afterEach(async()=>{
        await browser.close()
    })

    test("Test Scenario 1 - Simple Form Demo", async({})=>{
        
        await page.getByText("Simple Form Demo").click()
    
        await expect(page.url()).toContain('simple-form-demo')
    
        let value = "Welcome to LamdaTest"
    
        await page.getByPlaceholder('Please enter your Message').type(value, {delay: 100})
    
        await page.getByRole('button', {name: 'Get Checked Value'}).click()
    
        await expect(page.locator("#message")).toHaveText(value)
    
    })
    
    test("Test Scenario 2 - Drag and Drop Sliders",async({})=>{
    
        await page.getByText("Drag & Drop Sliders").click()
    
        const Slider = await page.locator('#slider3')
        for(var i =0;i<80;i++)
        {
            await Slider.locator("[type='range']").press('ArrowRight')
        }
        
        await expect(page.locator("#rangeSuccess")).toHaveText('95')
    
    })
    
    test("Test Scenario 3 - Input Form Submit",async({})=>{
    
        await page.getByText("Input Form Submit").click()
    
        //await page.getByText("Submit").click()
    
         // Assert “Please fill in the fields” error message.
        //const errorMsg = await page.textContent('//div[@id="validation-message"]');
        //expect(errorMsg).toBe('Please fill in the fields');
        
    
        await page.locator("#name").fill("Neel K")
        await page.locator("#inputEmail4").fill('neelk@yopmail.com')
        await page.locator('#inputPassword4').fill('neelk')
        await page.locator('#company').fill('ABC PVT LTD')
        await page.locator('#websitename').fill('www.com.omm')
    
        const dropdown = page.locator("[name='country']")
        await dropdown.click()
        await dropdown.selectOption({value:'US'})
    
        await page.getByPlaceholder("City").fill("Long Beach")
        await page.locator("[name='address_line1']").fill("145 Suite #2")
        await page.locator("[name='address_line2']").fill("BLVD APTS")
        await page.locator("#inputState").fill("California")
        await page.locator("#inputZip").fill("12345")
    
        await page.getByText("Submit").click()
    
        const Expected_message = "Thanks for contacting us, we will get back to you shortly."
    
        await expect(page.locator(".success-msg.hidden")).toHaveText(Expected_message)
       
    
    })

})

