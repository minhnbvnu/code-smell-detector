function generateQQQueryString(shareData) {
    return generateQueryString({
        share_id: 924053302,
        url: Base64.encode(shareData.link),
        title: Base64.encode(shareData.title),
        description: Base64.encode(shareData.desc),
        previewimageUrl: Base64.encode(shareData.icon), // ios
        image_url: Base64.encode(shareData.icon), // android
    })
}