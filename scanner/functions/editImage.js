async function editImage (originalImage, mask = [], prompt, num = 1, size = '512x512') {
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
    logger.info({ originalImage, mask, num, size })
  }
  const imageResponse = await fetch(originalImage)
  const fileType = imageResponse.headers.get('Content-Type').split('/')[1]
  let fileLoc = `data/chatgpt/imagesAccept/${Date.now()}.${fileType}`
  mkdirs('data/chatgpt/imagesAccept')
  const blob = await imageResponse.blob()
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  await fs.writeFileSync(fileLoc, buffer)
  let proxyFn = getProxy()
  let croppedFileLoc = `data/chatgpt/imagesAccept/${Date.now()}_cropped.png`
  await resizeAndCropImage(fileLoc, croppedFileLoc, 512)
  let maskFileLoc = await createMask(croppedFileLoc, mask)
  let response = await openai.createImageEdit(
    fs.createReadStream(croppedFileLoc),
    prompt, fs.createReadStream(maskFileLoc),
    num,
    size,
    'b64_json',
    '',
    {
      httpsAgent: Config.proxy ? proxyFn(Config.proxy) : null
    }
  )
  if (response.status !== 200) {
    console.log(response.data.error)
  }
  await fs.unlinkSync(fileLoc)
  await fs.unlinkSync(croppedFileLoc)
  await fs.unlinkSync(maskFileLoc)
  return response.data.data?.map(pic => pic.b64_json)
}