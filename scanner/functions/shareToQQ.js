function shareToQQ() {
    const shareScheme = isIos
        ? 'mqqapi://share/to_fri?src_type=web&version=1&file_type=news'
        : 'mqqapi://share/to_fri?src_type=isqqBrowser&version=1&file_type=news'
    openAppByScheme(`${shareScheme}&${generateQQQueryString(shareData)}`)
}