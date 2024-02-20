function* checkInstance (action) {
  const { type, nsInstance, resolve, reject } = action.payload
  try {
    const asyncData = yield call(request, {
      method: 'get',
      url: `${api.instance}?type=${type}&nsInstance=${nsInstance}`
    })
    const msg = asyncData && asyncData.msg ? asyncData.msg : ''
    const code = asyncData && asyncData.code ? asyncData.code : ''
    if (code && code >= 400) {
      reject(msg)
    }
    if (code && code === 200) {
      resolve(msg)
    }
  } catch (err) {
    console.log(err)
  }
}