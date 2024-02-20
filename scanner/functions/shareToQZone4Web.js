function shareToQZone4Web() {
    const queryObj = {
        url: shareData.link,
        title: shareData.title,
        pic: shareData.icon,
        desc: shareData.desc,
    }
    location.href = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?${generateQueryString(queryObj, true)}`
}