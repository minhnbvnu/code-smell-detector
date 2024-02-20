async function getSingerMvList ({singerMid, page}) {
  // cid  是啥？ 我也不知道，我也很绝望啊，https://y.gtimg.cn/music/portal/js/v4/singer_afadc5b.js?max_age=31536000 代码里面直接写死了的，我好慌
  let url =  `http://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg?singermid=${singerMid}&order=listen&begin=${page * 35}&num=35&cid=205360581`
  let {list, total} = (await baseRequest(url)).data.data
  return {
    total: Math.floor(total / 35),
    list: list ? list.map(({title, pic, vid}) => new Mv(title, pic, vid)) : []
  }
}