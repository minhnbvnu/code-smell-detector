function shareToQZone() {
    const shareScheme = isIos
        ? 'mqqapi://share/to_fri?file_type=news&src_type=web&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A'
        : 'mqqapi://share/to_qzone?src_type=isqqBrowser&version=1&file_type=news&req_type=1'
    openAppByScheme(`${shareScheme}&${generateQQQueryString(shareData)}`)
}