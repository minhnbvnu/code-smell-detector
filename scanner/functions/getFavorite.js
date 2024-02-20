async function getFavorite () {
  return {
    song: await db.song.toArray(),
    singer: (await db.singer.toArray()).map(obj => new Singer(
      obj.singerName, obj.singerMid
    )),
    album: (await db.album.toArray()).map(obj => new Album(
      obj.albumName, obj.albumMid
    )),
    playList: (await db.playList.toArray()).map(obj => new PlayList(
      obj.playListMid, obj.playListName, obj.imgUrl
    ))
  }
}