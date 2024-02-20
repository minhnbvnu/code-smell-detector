function drawPoster(data) {
    return new Promise(function(resolve, reject) {
        switch (data.shareType) {
            case "index":
                // 个人分享图
                resolve(drawIndexPoster(data));
                case "goods":
                  // 商品分享图
                resolve(drawGoodsPoster(data));
            default:
                break;
        }
    });
}