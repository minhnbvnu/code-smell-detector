async function generateVitsAudio (text, speaker = '随机', language = '中日混合（中文用[ZH][ZH]包裹起来，日文用[JA][JA]包裹起来）', noiseScale = parseFloat(Config.noiseScale), noiseScaleW = parseFloat(Config.noiseScaleW), lengthScale = parseFloat(Config.lengthScale)) {
  if (!speaker || speaker === '随机') {
    logger.info('随机角色！这次哪个角色这么幸运会被选到呢……')
    speaker = speakers[randomNum(0, speakers.length)]
  }
  text = wrapTextByLanguage(text)
  logger.info(`正在使用${speaker}，基于文本：'${text}'生成语音`)
  let body = {
    data: [
      text, language, speaker,
      noiseScale, noiseScaleW, lengthScale
    ]
  }
  let space = Config.ttsSpace
  if (space.endsWith('/api/generate')) {
    let trimmedSpace = space.substring(0, space.length - 13)
    logger.warn(`vits api 当前为${space}，已校正为${trimmedSpace}`)
    space = trimmedSpace
  }
  if (space.endsWith('/')) {
    let trimmedSpace = _.trimEnd(space, '/')
    logger.warn(`vits api 当前为${space}，已校正为${trimmedSpace}`)
    space = trimmedSpace
  }
  let url = `${space}/api/generate`
  if (Config.huggingFaceReverseProxy) {
    url = `${Config.huggingFaceReverseProxy}/api/generate?space=${_.trimStart(space, 'https://')}`
  }
  logger.info(`正在使用接口${url}`)
  let response = await newFetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    }
  })
  let responseBody = await response.text()
  try {
    let json = JSON.parse(responseBody)
    if (Config.debug) {
      logger.info(json)
    }
    if (response.status > 299) {
      logger.info(json)
      throw new Error(JSON.stringify(json))
    }
    let [message, audioInfo, take] = json?.data
    logger.info(message, take)
    let audioLink = `${space}/file=${audioInfo.name}`
    if (Config.huggingFaceReverseProxy) {
      if (Config.debug) {
        logger.info('使用huggingface加速反代下载生成音频' + Config.huggingFaceReverseProxy)
      }
      let spaceHost = _.trimStart(space, 'https://')
      audioLink = `${Config.huggingFaceReverseProxy}/file=${audioInfo.name}?space=${spaceHost}`
    }
    return audioLink
  } catch (err) {
    logger.error('生成语音api发生错误，请检查是否配置了正确的api，且仓库是否开放为public', response.status)
    throw new Error(responseBody)
  }
}