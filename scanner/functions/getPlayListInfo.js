async function getPlayListInfo (playListMid) {
  let url = `http://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${playListMid}&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
  let {cdlist: [{dissname, songlist}]} = JSON.parse((await baseRequest(url)).data.slice(13, -1))
  return {
    playListName: dissname,
    list: songlist.map(
      ({songname, songmid, strMediaMid, albumname, albummid, singer, type, pay: {payplay}}) =>
        new Music(
          songname, songmid, strMediaMid,
          new Album(albumname, albummid),
          singer.map(
            ({mid, name}) => new Singer(name, mid))
          , type, payplay))
  }
}