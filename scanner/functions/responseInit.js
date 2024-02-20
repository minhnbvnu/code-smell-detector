function responseInit(resp, init) {
  if (typeof resp.init === 'object') {
    return resp.init
  } else {
    init = Object.assign({}, init || {})
    for (const field of ['status', 'statusText', 'headers', 'url']) {
      if (field in resp) {
        init[field] = resp[field]
      }
    }
    return init
  }
}