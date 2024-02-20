async function FavoriteAlbum (albummid, flag) {
  if (!getuser()) {
    return
  }
  let id = (await request(`http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?ct=24&albummid=${albummid}&g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`, _config())).data
  let url = `http://c.y.qq.com/folder/fcgi-bin/fcg_qm_order_diss.fcg?g_tk=${_gtk()}`
  let data = {
    loginUin: `${_user()}`,
    hostUin: `0`,
    format: `fs`,
    inCharset: `GB2312`,
    outCharset: `utf8`,
    notice: `0`,
    platform: `yqq`,
    needNewCode: `0`,
    g_tk: `${_gtk()}`,
    uin: `1165316728`,
    ordertype: `1`,
    albumid: `${id}`,
    albummid: `${albummid}`,
    from: `1`,
    optype: `${flag}`,
    utf8: `1`
  }
  request(url, _postconfig(querystring.stringify(data)))
}