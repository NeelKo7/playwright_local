const {test, expect, request} = require('@playwright/test')
const loginpayload = {userEmail:"neelk1@yopmail.com",userPassword:"Iamking@123"}
let token;
test.beforeAll(async()=>{
    const apiContext = await request.newContext()
    const loginresponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data: loginpayload
    })

    expect(loginresponse.ok()).toBeTruthy()
    const loginresponsejson = await loginresponse.json()

    token = loginresponsejson.token
})

test("Api Demo login",async({page})=>{
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)},token)

    await page.goto("https://rahulshettyacademy.com/client/")
    const body =  page.locator("card-body")
    const text = await body.locator("h5").textContent()

    for(i in 4)
    {
        console.log(text[i])
    }
        await page.pause()

})

