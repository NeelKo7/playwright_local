const {test , expect , request} = require('@playwright/test')
const loginpayload = {userEmail:"neelk1@yopmail.com",userPassword:"Iamking@123"}
let token;
test.beforeAll(async()=>{
    const apicontext = await request.newContext()
    const loginresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data: loginpayload
    })
    const loginresponsejson = await loginresponse.json()

    token = loginresponsejson.token
})

test("API DEMO",async({page})=>{
    await page.addInitScript(value=>{
        // Set the local storage token
        window.localStorage.setItem('token',value)},token)

    await page.goto("https://rahulshettyacademy.com/client")

    await page.pause()
})