async function getCdn (guid) {
  const url = `http://u.y.qq.com/cgi-bin/musicu.fcg?data=${encodeURIComponent(`{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":${guid},"calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"${guid}","songmid":["000KDHyB23K7Eq"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`)}`
  const { data: { req: { data: { sip: cdnList, testfilewifi: testUrl } } }} = await baseRequest(url)
  return new Promise((resolve, reject) => {
    cdnList.map(cdn => {
      baseRequest(cdn + testUrl).then(() => {
        resolve(cdn)
      })
    })
  })
}