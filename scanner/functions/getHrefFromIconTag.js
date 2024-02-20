function getHrefFromIconTag() {
    return Object(iconTag).href || `${location.protocol}//${location.hostname}/favicon.ico`
}