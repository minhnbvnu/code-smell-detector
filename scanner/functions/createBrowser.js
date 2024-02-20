async function createBrowser(name, options) {
    let browser = await puppeteer.launch({
        args: [
            '--disable-notifications',
            '--disable-web-security',
            '--hide-scrollbars',
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
        ],
        executablePath: process.env.OVERRIDE_CHROMIUM_PATH,
        headless: settings.HEADLESS,
        pipe: true,
    })

    let pages = await browser.pages()
    pages[0]._name = name
    return {browser, pages}
}