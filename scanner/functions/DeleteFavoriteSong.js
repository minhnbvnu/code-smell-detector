async function DeleteFavoriteSong (songmid) {
  if (!getuser()) {
    return
  }
  // 我也不造为什么删除之前还要查询数据，不然删除是不会成功的（即使相应里说删除成功）
  await SongFromRemote()
  let data = {
    oginUin: `${_user()}`,
    hostUin: '0',
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: '0',
    platform: 'yqq.post',
    needNewCode: '0',
    uin: `${_user()}`,
    dirid: '201',
    ids: `${songids[songmid]}`,
    source: '103',
    types: '3',
    formsender: '4',
    flag: '2',
    from: '3',
    utf8: '1',
    g_tk: `${_gtk()}`
  }
  let url = `http://c.y.qq.com/qzone/fcg-bin/fcg_music_delbatchsong.fcg?g_tk=${_gtk()}`
  request(url, _postconfig(querystring.stringify(data)))
}