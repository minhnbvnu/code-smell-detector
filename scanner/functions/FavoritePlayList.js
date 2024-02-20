async function FavoritePlayList (playListMid, flag) {
  if (!getuser()) {
    return
  }
  var url = `http://c.y.qq.com/folder/fcgi-bin/fcg_qm_order_diss.fcg?g_tk=${_gtk()}`
  var data = {
    loginUin: `${_user()}`,
    hostUin: '0',
    format: 'fs',
    inCharset: 'GB2312',
    outCharset: 'utf8',
    notice: '0',
    platform: 'yqq',
    needNewCode: '0',
    g_tk: `${_gtk()}`,
    uin: `${_user()}`,
    dissid: `${playListMid}`,
    from: '1',
    optype: `${flag}`,
    utf8: '1'
  }
  request(url, (_postconfig(querystring.stringify(data))))
}