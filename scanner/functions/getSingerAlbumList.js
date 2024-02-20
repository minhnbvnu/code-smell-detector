async function getSingerAlbumList ({singerMid, page}) {
  let url = `http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg?singermid=${singerMid}&order=time&begin=${page * 30}&num=30`
  let {list, total} = (await baseRequest(url)).data.data
  return {
    total: Math.floor(total / 30),
    list: list ? list.map(({albumMID, albumName}) => new Album(albumName, albumMID)) : []
  }
}