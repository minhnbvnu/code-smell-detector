async function DeleteSinger (singermid) {
  if (!getuser()) {
    return
  }
  let url = `http://c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_del.fcg?g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=gb2312&notice=0&platform=yqq.json&needNewCode=0&singermid=${singermid}`
  request(url, _config())
}