function drawCard(data) {
    return new Promise(function(resolve, reject) {
        switch (data.shareType) {
            case "goods":
                resolve(drawGoodsCard(data));
            default:
                break;
        }
    });
}