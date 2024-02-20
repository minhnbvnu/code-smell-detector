async function getSearch ({keyword, page}) {
  let url = `http://c.y.qq.com/soso/fcgi-bin/client_search_cp?new_json=1&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=20&w=${encodeURIComponent(keyword)}&needNewCode=0`
  let {zhida, song: {list, totalnum, curpage}} = JSON.parse((await baseRequest(url)).data.slice(9, -1)).data // zhida ？ 直达 api 里面有中文 
  let direct
  switch (zhida.type) {
    case 1:
      direct = new Singer(zhida.zhida_singer.singerName, zhida.zhida_singer.singerMID)
      break;
    case 2:
      direct = new Album(zhida.zhida_album.albumName, zhida.zhida_album.albumMID)
      break;
  }
  return {direct, totalPage: Math.ceil(totalnum / 20),
    songList: list.map(
      ({name, mid, file: {media_mid}, singer, album, type, pay: {pay_play}}) =>
        new Music(
          name, mid, media_mid,
          new Album(album.name, album.mid),
          singer.map(singerItem =>
              new Singer(singerItem.name, singerItem.mid)),
          type, pay_play))
  }
}