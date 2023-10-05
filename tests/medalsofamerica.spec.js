const{test, expect, request} = require('@playwright/test');
const { timeout } = require('../playwright.config');

let context;  
let page;
test('Login',async({browser})=>{
    
    test.slow();
    context = await browser.newContext({
        httpCredentials:{username:"mw2consulting",password:"mw2consulting123"}
    }
    )

    page = await context.newPage()
    await page.goto("https://medalsofamerica.mw2consulting.com/")
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Close dialog 1' }).click()

    await expect(page).toHaveURL("https://medalsofamerica.mw2consulting.com/")
    await page.getByText("Sign In").first().click()

    await page.getByRole('textbox', { name: 'Email Address*' }).type("neeltesttwo@yopmail.com",{delay:100})
    await page.getByRole('textbox', { name: 'Password*' }).type("wxyz@123",{delay:100})
    

    const navigationPromise = page.waitForNavigation();
    await page.getByRole('button', { name: 'Sign In' }).click()
    await navigationPromise;
    
    //await expect(page.getByRole('banner').getByText('Welcome,')).toContainText("Welcome,")
    console.log("Login Completed")
})

test("Placing a Ribbon Rack Builder Guest Order",async({browser})=>{
    
    context = await browser.newContext({
        httpCredentials:{username:"mw2consulting",password:"mw2consulting123"}
    })
    const page = await context.newPage()
    await page.goto("https://medalsofamerica.mw2consulting.com/")
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Close dialog 1' }).click()
    await page.hover("xpath=//span[normalize-space()='Medals & Ribbons']")
    await page.locator("#ui-id-5 #ui-id-14").click()
    await page.waitForLoadState('networkidle')
    await page.locator('.seldiv').first().click()
    //await page.getByRole('radio').first().click()
    await page.waitForLoadState('networkidle')
    await page.locator('.selinner').nth(1).click()
    await page.getByRole('button', { name: 'Build It' }).click()
    await page.locator('div:nth-child(207) > .see_details_pop_mian > .see_details_pop_span').click()
    await page.getByRole('button', { name: 'Add ribbon' }).click()
    await page.locator('#builder_preview').getByText('Preview Now').click()
    await page.getByRole('button', { name: 'Add to Cart' }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    await expect(page.locator(".totals.sub")).toBeVisible()
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
    await page.waitForLoadState('networkidle')
    // Checkout Process
    await page.getByLabel('Email', { exact: true }).type("neelk1@yopmail.com",{delay:100})
    await page.getByRole('button', { name: 'Continue to shipping' }).click()
    const check_button = page.getByRole('button', { name: 'Continue to shipping' })
    if(check_button == true)
    {
        await page.getByRole('button', { name: 'Continue to shipping' }).click()
    }
    else
    {
        console.log("All ok")
    }
    // Address Filling
    await page.getByLabel('First name', { exact: true }).fill("neel")
    await page.getByLabel('Last name', { exact: true }).fill("test")
 
    await page.getByLabel('Address', { exact: true }).fill("Address from Automation")
    await page.getByPlaceholder('_____-____').fill("12345")
    await page.getByRole('combobox', { name: 'State*' }).click()
    await page.getByRole('combobox', { name: 'State*' }).selectOption("Georgia")
    await page.getByLabel('City').fill("Los Angel")
    await page.getByPlaceholder('(___) ___-____').fill("1234567890")
    await page.locator(".collapsible-section-title").click()
    await page.locator(".shipping-method-card.field.choice").first().click()
    await page.getByRole("button",{name: 'Continue to payment'}).click()
    await page.locator("#checkmo").click()
    await page.getByRole("button", {name: 'Pay now' }).click()

    const order_id = await page.locator(".column.column-1 p span").textContent()
    console.log("order_id = ", order_id)
    
})

test.only("Cart Page Validation",async({browser})=>{
    const context = await browser.newContext({
        httpCredentials:{username:"mw2consulting",password:"mw2consulting123"}
    });
    const page = await context.newPage()
    test.slow()
    await page.goto("https://medalsofamerica.mw2consulting.com/in-memoriam-pin-and-patch-gift-set")
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Close dialog 1' }).click()
    //Add a Product to Cart
    const add_to_cart = page.locator("#product-addtocart-button")
    await add_to_cart.click()

    //Increase the quantity from PDP 
    await page.locator(".field.qty").type('10', {delay:100})
    await add_to_cart.click()

   //await expect(page.locator("#cart-item-10807652-qty")).toHaveValue('11')
    await page.locator(".action.viewcart").click()

    await page.waitForLoadState('networkidle')
    //Redirected to Cart Page Check the Subtotal 

    const price = await page.locator(".cart-price").first().textContent()
    const Qty = await page.getByRole('spinbutton', { name: 'Qty' }).textContent()
    const Subtotal = await page.locator("cart-price").nth(2).textContent()
    const cal = price * Qty
    await expect(Subtotal).toHaveValue(cal)
    console.log("Subtotal : ", cal)

    await page.pause()

    
})