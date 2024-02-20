function generateQueryString(queryObj, needEncode = false) {
    const arr = []
    for (let key in queryObj) {
        if (needEncode) {
            arr.push(`${key}=${encodeURIComponent(queryObj[key])}`)
        } else {
            arr.push(`${key}=${queryObj[key]}`)
        }
    }
    return arr.join('&')
}