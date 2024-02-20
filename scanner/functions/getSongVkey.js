async function getSongVkey({fileName, guid, songMid}) {
  // cid 是啥？ 我也不造啊 qq 那群人写死了
  const url = 'http://u.y.qq.com/cgi-bin/musicu.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
  const params = getMusicParams(songMid)
  const result = (await baseRequest({
    url,
    params: {
      data: params
    }
  })).data
  return result.req_0.data.midurlinfo[0].purl
}