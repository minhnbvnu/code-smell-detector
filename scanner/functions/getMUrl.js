async function getMUrl ({fileid}) {
  let url = `http://u.y.qq.com/cgi-bin/musicu.fcg?data=%7B%22getMvUrl%22%3A%7B%22module%22%3A%22Mv.MvDownloadUrlServer%22%2C%22method%22%3A%22GetMvUrls%22%2C%22param%22%3A%7B%22fileid%22%3A%5B%22${fileid}%22%5D%2C%22filetype%22%3A%5B-1%5D%7D%7D%7D`
  let {cn, url: [mvSourceUrl], vkey} = (await baseRequest(url)).data.getMvUrl.data.data[fileid][2]
  return {
    cn, mvSourceUrl, vkey
  }
}