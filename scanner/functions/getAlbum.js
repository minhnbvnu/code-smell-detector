async function getAlbum ({albumMid}) {
  let url = `http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=${albumMid}&g_tk=5381&hostUin=0&notice=0&platform=yqq&needNewCode=0`
  let {list, name} = (await baseRequest(url)).data.data
  return {
    musicList: list.map(
      ({songname, songmid, strMediaMid, albumname, albummid, singer, type, pay: {payplay}}) =>
        new Music(
          songname, songmid, strMediaMid,
          new Album(albumname, albummid),
          singer.map(({mid, name}) => new Singer(name, mid)),
          type, payplay)),
    album: new Album(name, albumMid)
  }
}