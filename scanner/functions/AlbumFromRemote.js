async function AlbumFromRemote () {
  var url = `http://c.y.qq.com/fav/fcgi-bin/fcg_get_profile_order_asset.fcg?g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=20&cid=205360956&userid=${_user()}.&reqtype=2&ein=`
  let num = (await request(url, _config())).data.data.totalalbum
  url += `${num}`
  let albumlist = (await request(url, _config())).data.data.albumlist
  return (albumlist.map(({albumname, albummid}) => new Album(albumname, albummid)).slice(0, num))
}