async function loginAndWizard(name, onExit, {screens = false} = {}) {
    await step(name, 'open browser')
    let browser = await createBrowser(name)

    // Keep browsers open when DEBUG=true, this will halt the next tests
    // and gives the developer time to debug.
    if (!settings.DEBUG_MODE) {
        onExit(async() => {
            await step(name, 'close browser')
            await browser.browser.close()
        })
    } else {
        console.log('NOEXIT=false: Not closing browsers automatically.')
    }

    let page = browser.pages[0]
    page.setViewport({height: 600, width: 500})
    // Apply timeouts to make tests fail earlier.
    page.setDefaultNavigationTimeout(15000)
    // Patch waitForSelector to always use a default timeout.
    const _waitForSelector = page.waitForSelector.bind(page)
    page.waitForSelector = async(selector, options = {timeout: 30000}) => {
        await _waitForSelector(selector, options)
    }

    const uri = `http://127.0.0.1:${settings.BRAND.tests.port}/index.html?test=true`
    await page.goto(uri, {})

    const me = {
        app: await page.$('#app'),
        browser: browser,
        page: page,
    }

    await step(name, 'logging in')
    await login(me, screens)

    await step(name, 'completing wizard')
    const options = await wizard(me, screens)
    await page.click('.test-delete-notification')

    // Wait until the keypad is available.
    await page.waitForSelector('.test-keypad-available')
    return Object.assign({options}, me)
}