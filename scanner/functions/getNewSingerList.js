async function getNewSingerList ({page, area, sex, genre, index}) {
  let url = `http://u.y.qq.com/cgi-bin/musicu.fcg?g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=${encodeURIComponent(`{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":${area},"sex":${sex},"genre":${genre},"index":${index},"sin":${(page - 1) * 80},"cur_page":${page}}}}`)}`
  /* eslint-disable */
  let {data: {singerlist, total}} = (await baseRequest(url)).data.singerList
  return {
    totalPage: Math.floor(total / 80), 
    singerList: singerlist.map(({singer_name, singer_mid}) => new Singer(singer_name, singer_mid))
  }
  /* eslint-disable */
}