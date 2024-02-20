async function LocalToRemote () {
  let data = await getFavorite()
  for (var i = 0; i < data['song'].length; i++) {
    await AddFavoriteSong(data['song'][i].songMid)
  }
  for (i = 0; i < data['album'].length; i++) {
    await FavoriteAlbum(data['album'][i].albumMid, 1)
  }
  for (i = 0; i < data['playList'].length; i++) {
    await FavoritePlayList(data['playList'][i].playListMid)
  }
  for (i = 0; i < data['singer'].length; i++) {
    await AddSinger(data['singer'][i].singerMid)
  }
}