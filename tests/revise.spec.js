const {test,expect} = require('@playwright/test')


test.only('1. selecting adidas original from list, Add to cart and validate it and click on checkout 2. fill personal info',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/client')

    await page.locator('#userEmail').type('amitchikte@gmail.com')

    await page.locator('#userPassword').type('Amit@111992')

    await page.locator('#login').click()

    await page.waitForLoadState('networkidle')
    await expect(page.locator('.card-body b').first()).toHaveText('zara coat 3')

    const product = await page.locator('.card-body').locator('b').count()

    console.log(product)



    for(let i=0;i<product;i++){

        if(await page.locator('.card-body').locator('b').nth(i).textContent() =='adidas original'){

            await page.locator('.card-body').nth(i).locator('text= Add To Cart').click()

            break;

        }

       

    }



    await page.waitForTimeout(10000)

    await page.locator('[routerlink="/dashboard/cart"]').click()

    // await page.waitForTimeout(10000)

    expect(await page.locator('[class="cart"] h3')).toHaveText('adidas original')

    // await page.waitForTimeout(10000)

    await page.locator('[type="button"]').locator('text=Checkout').click()



    await page.locator('[class="field"] [class="input txt text-validated"]').fill('123456789')

    await page.locator('[class="field small"] [class="input txt"]').type('653')

    await page.locator('[class="field"] [class="input txt"]').type('Kotak')

    await page.locator('[class="field small"] [name="coupon"]').type('Discount')

   



})

