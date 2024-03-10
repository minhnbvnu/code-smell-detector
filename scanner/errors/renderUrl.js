async function renderUrl (e, url, renderCfg = {}) {
  // 云渲染
  if (Config.cloudRender) {
    url = url.replace(`127.0.0.1:${Config.serverPort || 3321}`, Config.serverHost || `${await getPublicIP()}:${Config.serverPort || 3321}`)
    const cloudUrl = new URL(Config.cloudTranscode)
    const resultres = await fetch(`${cloudUrl.href}screenshot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        option: {
          width: renderCfg.Viewport.width || 1280,
          height: renderCfg.Viewport.height || 720,
          timeout: 120000,
          waitUtil: renderCfg.waitUtil || 'networkidle2',
          wait: renderCfg.wait || 1000,
          func: renderCfg.func || '',
          dpr: renderCfg.deviceScaleFactor || 1
        },
        type: 'image'
      })
    })
    if (resultres.ok) {
      const buff = Buffer.from(await resultres.arrayBuffer())
      if (buff) {
        const base64 = segment.image(buff)
        if (renderCfg.retType === 'base64') {
          return base64
        }
        let ret = true
        if (base64) {
          ret = await e.reply(base64)
        }
        return renderCfg.retType === 'msgId' ? ret : true
      }
    }
  }

  await _puppeteer.browserInit()
  const page = await _puppeteer.browser.newPage()
  let base64
  try {
    await page.goto(url, { timeout: 120000 })
    await page.setViewport(renderCfg.Viewport || {
      width: 1280,
      height: 720
    })
    await page.waitForTimeout(renderCfg.wait || 1000)
    let buff = base64 = await page.screenshot({ fullPage: true })
    base64 = segment.image(buff)
    await page.close().catch((err) => logger.error(err))
  } catch (error) {
    logger.error(`${url}图片生成失败:${error}`)
    /** 关闭浏览器 */
    if (_puppeteer.browser) {
      await _puppeteer.browser.close().catch((err) => logger.error(err))
    }
    _puppeteer.browser = false
  }

  if (renderCfg.retType === 'base64') {
    return base64
  }
  let ret = true
  if (base64) {
    ret = await e.reply(base64)
  }
  return renderCfg.retType === 'msgId' ? ret : true
}