async function createImage (prompt, n = 1, size = '512x512') {
  let basePath = Config.openAiBaseUrl
  if (Config.openAiBaseUrl && Config.proxy && !Config.openAiForceUseReverse) {
    // 如果配了proxy，而且有反代，但是没开启强制反代
    basePath = defaultOpenAIReverseProxy
  }
  if (!Config.openAiBaseUrl) {
    basePath = await isCN() ? defaultOpenAIReverseProxy : defaultOpenAIAPI
  }
  const configuration = new Configuration({
    apiKey: Config.apiKey,
    basePath
  })
  const openai = new OpenAIApi(configuration)
  if (Config.debug) {
    logger.info({ prompt, n, size })
  }
  let proxyFn = proxy
  const response = await openai.createImage({
    prompt,
    n,
    size,
    response_format: 'b64_json'
  }, {
    httpsAgent: Config.proxy ? proxyFn(Config.proxy) : null
  })
  return response.data.data?.map(pic => pic.b64_json)
}