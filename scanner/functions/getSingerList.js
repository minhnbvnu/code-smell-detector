async function getSingerList ({ page, country, name }) {
  let url = `http://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=${country}_${name}&pagesize=100&pagenum=${page}&format=jsonp`
  /* eslint-disable */
  let {data: {list, total_page}} = (await baseRequest(url)).data 
  return {
    totalPage: total_page, 
    singerList: list.map(
      ({Fsinger_name, Fsinger_mid}) => new Singer(Fsinger_name, Fsinger_mid))
  }
  /* eslint-disable */
}