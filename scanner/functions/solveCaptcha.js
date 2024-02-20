async function solveCaptcha (id, regionId, text, token) {
  let baseUrl = Config.sydneyReverseProxy
  let url = `${baseUrl}/edgesvc/turing/captcha/verify?type=visual&id=${id}&regionId=${regionId}&value=${text}`
  let res = await newFetch(url, {
    headers: {
      Cookie: '_U=' + token,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82',
      Referer: 'https://edgeservices.bing.com/edgesvc/chat?udsframed=1&form=SHORUN&clientscopes=chat,noheader,channelstable,&shellsig=ddb7b7dc7a56d0c5350f37b3653696bbeb77496e&setlang=zh-CN&lightschemeovr=1'
    }
  })
  res = await res.json()
  if (res.reason === 'Solved') {
    return {
      result: true,
      detail: res
    }
  } else {
    return {
      result: false,
      detail: res
    }
  }
}