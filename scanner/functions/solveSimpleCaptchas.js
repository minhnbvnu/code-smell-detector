async function solveSimpleCaptchas (page) {
  try {
    const verifyYouAreHuman = await page.$('text=Verify you are human')
    if (verifyYouAreHuman) {
      logger.mark('encounter cloudflare simple captcha "Verify you are human"')
      await common.sleep(2000)
      await verifyYouAreHuman.click({
        delay: random.int(5, 25)
      })
      await common.sleep(1000)
    }
    const verifyYouAreHumanCN = await page.$('text=确认您是真人')
    if (verifyYouAreHumanCN) {
      logger.mark('encounter cloudflare simple captcha "确认您是真人"')
      await common.sleep(2000)
      await verifyYouAreHumanCN.click({
        delay: random.int(5, 25)
      })
      await common.sleep(1000)
    }

    const cloudflareButton = await page.$('.hcaptcha-box')
    if (cloudflareButton) {
      await common.sleep(2000)
      await cloudflareButton.click({
        delay: random.int(5, 25)
      })
      await common.sleep(1000)
    }
  } catch (err) {
    // ignore errors
  }
}