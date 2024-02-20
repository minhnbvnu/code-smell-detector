function getBrowserInfo(type) {
    let typeObj = {
        android: 'android',
        iphone: 'iphone',
        ipad: 'ipad',
        weixin: 'micromessenger'
    }
    return type ? navigator.userAgent.toLowerCase().indexOf(typeObj[type]) !== -1 : navigator.userAgent.toLowerCase();
}