async function createCaptcha (e, tokenU) {
  let baseUrl = Config.sydneyReverseProxy
  let imageResponse = await newFetch(`${baseUrl}/edgesvc/turing/captcha/create`, {
    headers: {
      Cookie: `_U=${tokenU};`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      Referer: 'https://edgeservices.bing.com/edgesvc/chat?udsframed=1&form=SHORUN&clientscopes=chat,noheader,channelstable,&shellsig=ddb7b7dc7a56d0c5350f37b3653696bbeb77496e&setlang=zh-CN&lightschemeovr=1'
    }
  })
  const blob = await imageResponse.blob()
  let id = imageResponse.headers.get('id')
  let regionId = imageResponse.headers.get('Regionid')
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64String = buffer.toString('base64')
  // await e.reply(segment.image(base64String))
  return { id, regionId, image: base64String }
}