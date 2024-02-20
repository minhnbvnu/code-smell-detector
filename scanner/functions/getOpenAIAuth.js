async function getOpenAIAuth (opt) {
  let {
    email,
    password,
    browser,
    page,
    timeoutMs = Config.chromeTimeoutMS,
    isGoogleLogin = false,
    captchaToken = Config['2captchaToken'],
    executablePath = Config.chromePath
  } = opt
  const origBrowser = browser
  const origPage = page

  try {
    const userAgent = await browser.userAgent()
    if (!page) {
      page = (await browser.pages())[0] || (await browser.newPage())
      page.setDefaultTimeout(timeoutMs)
    }
    await page.goto('https://chat.openai.com/auth/login', {
      waitUntil: 'networkidle2'
    })
    logger.mark('chatgpt checkForChatGPTAtCapacity')

    await checkForChatGPTAtCapacity(page)

    // NOTE: this is where you may encounter a CAPTCHA
    if (hasRecaptchaPlugin) {
      logger.mark('RecaptchaPlugin key exists, try to solve recaptchas')
      await page.solveRecaptchas()
    }

    logger.mark('chatgpt checkForChatGPTAtCapacity again')
    await checkForChatGPTAtCapacity(page)

    // once we get to this point, the Cloudflare cookies should be available

    // login as well (optional)
    if (email && password) {
      let retry = 3
      while (retry > 0) {
        try {
          await waitForConditionOrAtCapacity(page, () =>
            page.waitForSelector('#__next .btn-primary', { timeout: timeoutMs / 3 })
          )
        } catch (e) {
          await checkForChatGPTAtCapacity(page)
        }
        retry--
      }
      await waitForConditionOrAtCapacity(page, () =>
        page.waitForSelector('#__next .btn-primary', { timeout: timeoutMs / 3 })
      )
      await common.sleep(500)

      // click login button and wait for navigation to finish
      do {
        await Promise.all([
          page.waitForNavigation({
            waitUntil: 'networkidle2',
            timeout: timeoutMs
          }),
          page.click('#__next .btn-primary')
        ])
        await common.sleep(1000)
      } while (page.url().endsWith('/auth/login'))
      logger.mark('进入登录页面')
      await checkForChatGPTAtCapacity(page)

      let submitP

      if (isGoogleLogin) {
        await page.click('button[data-provider="google"]')
        await page.waitForSelector('input[type="email"]')
        await page.type('input[type="email"]', email, { delay: 10 })
        await Promise.all([
          page.waitForNavigation(),
          await page.keyboard.press('Enter')
        ])
        await page.waitForSelector('input[type="password"]', { visible: true })
        await page.type('input[type="password"]', password, { delay: 10 })
        submitP = () => page.keyboard.press('Enter')
      } else {
        await page.waitForSelector('#username')
        await page.type('#username', email, { delay: 20 })
        await common.sleep(100)

        if (hasRecaptchaPlugin) {
          // console.log('solveRecaptchas()')
          const res = await page.solveRecaptchas()
          // console.log('solveRecaptchas result', res)
        }

        await page.click('button[type="submit"]')
        await page.waitForSelector('#password', { timeout: timeoutMs })
        await page.type('#password', password, { delay: 10 })
        submitP = () => page.click('button[type="submit"]')
      }

      await Promise.all([
        waitForConditionOrAtCapacity(page, () =>
          page.waitForNavigation({
            waitUntil: 'networkidle2',
            timeout: timeoutMs
          })
        ),
        submitP()
      ])
    } else {
      await common.sleep(2000)
      await checkForChatGPTAtCapacity(page)
    }

    const pageCookies = await page.cookies()
    await redis.set('CHATGPT:RAW_COOKIES', JSON.stringify(pageCookies))
    const cookies = pageCookies.reduce(
      (map, cookie) => ({ ...map, [cookie.name]: cookie }),
      {}
    )

    const authInfo = {
      userAgent,
      clearanceToken: cookies.cf_clearance?.value,
      sessionToken: cookies['__Secure-next-auth.session-token']?.value,
      cookies
    }
    logger.info('chatgpt登录成功')

    return authInfo
  } catch (err) {
    throw err
  } finally {
    await page.screenshot({
      type: 'png',
      path: './error.png'
    })
    if (origBrowser) {
      if (page && page !== origPage) {
        await page.close()
      }
    } else if (browser) {
      await browser.close()
    }

    page = null
    browser = null
  }
}