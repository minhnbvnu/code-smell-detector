function parseUserInfo (list) {
    let result = {}
    list.forEach(e => {
      result[e.key] = e.value[0]
    })
    return result
  }