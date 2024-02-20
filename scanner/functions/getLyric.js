async function getLyric (songMid) {
  let url = `http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songMid}&g_tk=5381`
  let lyric = JSON.parse((await baseRequest(url)).data.slice(18, -1))
  return new Lyric(lyric.lyric, lyric.trans)
}