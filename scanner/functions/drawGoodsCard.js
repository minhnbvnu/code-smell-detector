function drawGoodsCard(goods) {
    let padding = 3; // 图片padding
    let posWidth = 210; // 图片默认宽度
    let posHeight = 168; // 图片高度
    const views = [
        {
            type: "rect",
            css: {
                left: `${padding}rpx`,
                top: `${padding}rpx`,
                color: "#fff",
                borderRadius: "2rpx",
                width: "204rpx",
                height: "131rpx"
            }
        },
        {
            type: "image",
            url: goods.shareImg,
            css: {
                left: "6rpx",
                top: "6rpx",
                width: "126rpx",
                height: "126rpx"
            }
        },
        {
            type: "text",
            text: "¥",
            css: {
                fontSize: "14rpx",
                color: "#FF5000",
                top: "59rpx",
                right: "64rpx"
            }
        },
        {
            type: "text",
            text: `${goods.goodsMoney}`,
            css: {
                fontSize: "21rpx",
                color: "#FF5000",
                top: "53rpx",
                left: "149rpx"
            }
        },
        {
            type: "text",
            text: `${goods.goodsPrice}`,
            css: {
                left: "138rpx",
                top: "74rpx",
                color: "#999999",
                fontSize: "11rpx",
                textDecoration: "line-through"
            }
        },
        {
            type: "rect",
            css: {
                right: "6rpx",
                top: "102rpx",
                color: "#FF5000",
                borderRadius: "10rpx",
                width: "70rpx",
                height: "20rpx"
            }
        },
        {
            type: "text",
            text: "到手价：",
            css: {
                fontSize: "11rpx",
                color: "#333333",
                top: "39rpx",
                left: "137rpx"
            }
        },
        {
            type: "text",
            text: "立即购买",
            css: {
                fontSize: "11rpx",
                color: "#fff",
                top: "106rpx",
                right: "19rpx"
            }
        },
        {
            type: "text",
            text: "精选好物",
            css: {
                left: "109rpx",
                fontSize: "15rpx",
                bottom: "10rpx",
                color: "#fff"
            }
        }
    ];
    return {
        width: `${posWidth}rpx`,
        height: `${posHeight}rpx`,
        background: "#FF5000",
        borderRadius: "5rpx",
        views: views
    };
}