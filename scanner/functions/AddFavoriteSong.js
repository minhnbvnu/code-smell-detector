async function AddFavoriteSong (songmid) {
  if (!getuser()) {
    return
  }
  let data = {
    loginUin: `${_user()}`,
    hostUin: '0',
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: '0',
    platform: 'yqq.post',
    needNewCode: '0',
    uin: `${_user()}`,
    midlist: `${songmid}`,
    typelist: '13',
    dirid: '201',
    addtype: '',
    formsender: '4',
    source: '153',
    r2: '0',
    r3: '1',
    utf8: '1',
    g_tk: `${_gtk()}`
  }
  let url = `http://c.y.qq.com/splcloud/fcgi-bin/fcg_music_add2songdir.fcg?g_tk=${_gtk()}`
  request(url, _postconfig(querystring.stringify(data)))
}