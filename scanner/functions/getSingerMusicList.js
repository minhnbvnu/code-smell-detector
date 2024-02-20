async function getSingerMusicList ({page, singerMid}) {
  let url = `http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?&singermid=${singerMid}&order=listen&begin=${page*30}&num=30`
  let {data: {list, total}} = (await baseRequest(url)).data
  return {
    total: Math.floor(total / 30),
    list: list.map(
      ({musicData: {
        songmid, strMediaMid, songname, albumname, albummid, singer, type, pay: { payplay }}}) =>
        new Music(songname, songmid, strMediaMid,
          new Album(albumname, albummid),
          singer.map(({mid, name}) => new Singer(name, mid))
          , type, payplay))
  }
}