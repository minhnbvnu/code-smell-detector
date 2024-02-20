async function getPlayList ({categoryId, page}) {
  let url = `http://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=${Math.random()}&g_tk=5381&jsonpCallback=getPlaylist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=${categoryId}&sortId=5&sin=${(page - 1) * 30}&ein=${page * 30 - 1}`
  let {list, sum} = JSON.parse((await baseRequest(url)).data.slice(12, -1)).data
  return {
    list: list.map(
      ({dissname, imgurl, dissid}) =>
        new PlayList(dissid, dissname, imgurl)),
    totalPage: Math.ceil(sum / 40)
  }
}