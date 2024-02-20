function getHostnameFromUrl(url) {
    const a = document.createElement('a')
    a.href = url
    return a.hostname
}