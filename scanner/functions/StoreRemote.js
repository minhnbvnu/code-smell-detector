async function StoreRemote () {
  let songs = await SongFromRemote()
  let singers = await SingerFromRemote()
  let albums = await AlbumFromRemote()
  let playLists = await PlayListFromRemote()
  songs.forEach(item => db.song.put(item))
  singers.forEach(item => db.singer.put(item))
  albums.forEach(item => db.album.put(item))
  playLists.forEach(item => db.playList.put(item))
}