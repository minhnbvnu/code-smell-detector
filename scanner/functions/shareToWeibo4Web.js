function shareToWeibo4Web() {
    const queryObj = {
        url: shareData.link,
        title: shareData.title,
        pic: shareData.icon,
    }
    location.href = `http://service.weibo.com/share/share.php?${generateQueryString(queryObj, true)}`
}