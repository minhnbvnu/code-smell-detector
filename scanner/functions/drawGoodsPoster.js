function drawGoodsPoster(goods) {
  let startTop = 40;
  let padding=12;
  let posWidth = 325; // 图片默认宽度
  let posHeight = 479; // 图片高度
  // 折扣
  let discount= parseFloat(goods.goodsMoney / goods.goodsPrice*10).toFixed(1)
  const views = [
    {
        type: "text",
        text: goods.shareTitle,
        css: {
            left: `${padding}rpx`,
            top: "13rpx",
            fontSize: "14rpx",
            maxLines: 1,
            width: "300rpx"
        }
    },
    {
        type: "image",
        url: goods.shareImg,
        css: {
            width: "325rpx",
            height: "325rpx",
            top: `${startTop}rpx`
        }
    },
    {
      type: "text",
      text: "到手价",
      css:{
        left: `${padding}rpx`,
        fontSize: "13rpx",
        bottom: "81rpx",
        color: "#333333"
    }
    },
    {
        type: "text",
        text: "¥",
        css: {
            left: '54rpx',
            bottom: "80rpx",
            color: "#FF5000",
            fontSize: "15rpx"
        }
    },
    {
        id: "goods-money",
        type: "text",
        text: `${goods.goodsMoney}`,
        css: {
            left: '63rpx',
            bottom: "79rpx",
            color: "#FF5000",
            fontSize: "30rpx"
        }
    },
    // 折扣
    {
        type: "rect",
        css: {
            bottom: "80rpx",
            left: ['70rpx', "goods-money"],
            color: "#FFF4F4",
            borderRadius: "8rpx",
            width: "36rpx",
            height: "16rpx"
        }
    },
    {
        type: "text",
        text: `${discount == 10 ? "原价" :discount + "折"} `,
        css: {
            left: ['74rpx', "goods-money"],
            bottom: "83rpx",
            color: "#FF5000",
            fontSize: "11rpx"
        }
    },
    {
        type: "text",
        text: `¥${goods.goodsPrice}`,
        css: {
            left: ['112rpx', "goods-money"],
            bottom: "83rpx",
            color: "#9C9C9C",
            fontSize: "12rpx",
            textDecoration: "line-through"
        }
    },
    {
        type: "image",
        url: goods.qrcode,
        css: {
            width: "79rpx",
            height: "79rpx",
            bottom: "27rpx",
            right: "15rpx"
        }
    },
    {
        type: "text",
        text: "长按二维码选购",
        css: {
            right: "20rpx",
            bottom: "13rpx",
            color: "#666666",
            fontSize: "9rpx"
        }
    }
];
  return {
      width: `${posWidth}rpx`,
      height: `${posHeight}rpx`,
      background: "#FFFFFF",
      borderRadius: "5rpx",
      views: views
  };
}