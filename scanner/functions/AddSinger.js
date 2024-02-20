async function AddSinger (singermid) {
  if (!getuser()) {
    return
  }
  let url = `http://c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_add.fcg?g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=gb2312&notice=0&platform=yqq.json&needNewCode=0&singermid=${singermid}&rnd=${+new Date()}`
  console.log((await request(url, _config())).data)
}