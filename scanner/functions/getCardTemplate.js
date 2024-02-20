function getCardTemplate(params) {
    return request({
        url: '/card/template',
        method: 'get'
    })
}