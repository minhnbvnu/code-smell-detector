function getOfflinePrice(params) {
    return request({
        url: 'https://rest.flamia.net/rest/items/get',
        method: 'get',
        data: params
    })
}