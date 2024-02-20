function setUrlParam(url, obj) {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] !== null && obj[p] !== '' && obj[p] !== undefined) {
            _rs.push(p + '=' + obj[p])
        }
    }
    return url + '?' + _rs.join('&');
}