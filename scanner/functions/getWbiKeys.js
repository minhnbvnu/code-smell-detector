async function getWbiKeys () {
  const resp = await fetch('https://api.bilibili.com/x/web-interface/nav')
  const jsonContent = resp.data
  const imgUrl = jsonContent.data.wbi_img.img_url
  const subUrl = jsonContent.data.wbi_img.sub_url

  return {
    img_key: imgUrl.slice(
      imgUrl.lastIndexOf('/') + 1,
      imgUrl.lastIndexOf('.')
    ),
    sub_key: subUrl.slice(
      subUrl.lastIndexOf('/') + 1,
      subUrl.lastIndexOf('.')
    )
  }
}