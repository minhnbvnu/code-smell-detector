async function SongFromRemote () {
  var info = await Info()
  var data = await getPlayListInfo(info.dissid)
  return data.list
}