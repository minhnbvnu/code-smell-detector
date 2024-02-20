async function getMvInfo ({mvId}) {
  let url = `http://u.y.qq.com/cgi-bin/musicu.fcg?data=%7B%22getMvInfo%22%3A%7B%22module%22%3A%22MvService.MvInfoProServer%22%2C%22method%22%3A%22GetMvInfoList%22%2C%22param%22%3A%7B%22vidlist%22%3A%5B%22${mvId}%22%5D%7D%7D%7D`
  let {name, vid, cover_pic, fileid} = (await baseRequest(url)).data.getMvInfo.data.mvlist[0]
  return {
    mv: new Mv(name, cover_pic, vid),
    fileid
  }
}