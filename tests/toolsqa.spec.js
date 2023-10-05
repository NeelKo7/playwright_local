const {test, expect} = require('@playwright/test')

let element_group;
test.beforeEach(async(page)=>{
    await page.goto("https://demoqa.com/")
    element_group = page.locator(".element-group")
})
test("tools QA Elements",async({page})=>{
    
    //Clicking on first locator (Elements)
    await page.locator(".card-body").first().click()
    await expect(page).toHaveURL("https://demoqa.com/elements")
    
    //Gets all the elements on the left hand side bar
    
    await element_group.first().locator("#item-0").click()
    await page.locator("#userName").type("Test")
    await page.locator("#userEmail").type("Test"+Date.now()+"@yopmail.com")
    await page.locator("#currentAddress").fill("Current test user address "+Date.now())
    await page.locator("#permanentAddress").fill("Permanent test user address "+Date.now())
    await page.locator("#submit").click()

    const get_text_output =  page.locator("#output").textContent()
    console.log(await get_text_output)

})

test("tools QA Checkbox",async(page)=>{
    await element_group.first().locator("#item-1").click()


    await page.

})