async function getBilibili (bvid) {
  let biliRes = await fetch('https://www.bilibili.com',
    {
      // headers: {
      // accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      // Accept: '*/*',
      // 'Accept-Encoding': 'gzip, deflate, br',
      // 'accept-language': 'en-US,en;q=0.9',
      // Connection: 'keep-alive',
      // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
      // }
    })
  const headers = biliRes.headers.raw()
  const setCookieHeaders = headers['set-cookie']
  if (setCookieHeaders) {
    const cookies = []
    setCookieHeaders.forEach(header => {
      const cookie = header.split(';')[0]
      cookies.push(cookie)
    })
    const cookieHeader = cookies.join('; ')
    let headers = {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en-US,en;q=0.9',
      Referer: 'https://www.bilibili.com',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
      cookie: cookieHeader
    }
    let videoInfo = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, {
      headers
    })
    videoInfo = await videoInfo.json()
    let cid = videoInfo.data.cid
    let arcurl = `http://www.bilibili.com/video/av${videoInfo.data.aid}`
    let title = videoInfo.data.title
    let pic = videoInfo.data.pic
    let description = videoInfo.data.desc
    let author = videoInfo.data.owner.name
    let play = videoInfo.data.stat.view
    let pubdate = videoInfo.data.pubdate
    let like = videoInfo.data.stat.like
    let honor = videoInfo.data.honor_reply?.honor?.map(h => h.desc)?.join('、')
    let downloadInfo = await fetch(`https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}`, { headers })
    let videoUrl = (await downloadInfo.json()).data.durl[0].url
    return {
      arcurl, title, pic, description, videoUrl, headers, bvid, author, play, pubdate, like, honor
    }
  } else {
    return {}
  }
}