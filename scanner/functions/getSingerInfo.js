async function getSingerInfo ({singerMid}) {

  function parseUserInfo (list) {
    let result = {}
    list.forEach(e => {
      result[e.key] = e.value[0]
    })
    return result
  }

  let url = `http://c.y.qq.com/splcloud/fcgi-bin/fcg_get_singer_desc.fcg?singermid=${singerMid}&utf8=1&outCharset=utf-8&format=xml`
  var parseString = require('xml2js').parseString;
  var xml = ((await (baseRequest(url))).data)
  return await new Promise((resolve, reject) => {
    parseString(xml, function (err, result) {
      if (err) {
        reject(err)
        return
      }
      if(!result.result.data[0].info){
        resolve({
          info: { 
            'T_T': '暂时没有该歌手的信息'
          }
        })
        return
      }
      let {basic, other, desc} = result.result.data[0].info[0]
      resolve({
        info: parseUserInfo(basic[0].item),
        desc: desc && desc[0],
        other: parseUserInfo(other[0].item)
      })
    })
  })
}