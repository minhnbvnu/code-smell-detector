async function SingerFromRemote () {
  try {
    var url = `https://u.y.qq.com/cgi-bin/musics.fcg?g_tk=487974496&sign=zzaud2d8k4f0sn19lgj7d7677d48543c029560401c6b4e39085&loginUin=1165316728&hostUin=0&format=json&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22music.concern.RelationList%22%2C%22method%22%3A%22GetFollowSingerList%22%2C%22param%22%3A%7B%22From%22%3A0%2C%22Size%22%3A30%2C%22HostUin%22%3A%22oK6s7Ko57wSANn**%22%7D%7D%7D`
    let list = (await request(url, _config())).data.singerList.data.List
    return list.map(({Name, MID}) => new Singer(Name, MID))
  } catch (e) {
    console.log(e)
    return []
  }
}