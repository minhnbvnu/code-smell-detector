function drawIndexPoster(index) {
    let startTop = 0;
    let padding=30;
    let posWidth = 325; // 图片默认宽度
    let posHeight = 325; // 图片高度
    const views = [
        
      {
        type: "text",
        text: index.shareTitle,
        css: {
            fontSize: "15rpx",
            color: "#333333",
            maxLines: 2,
            lineHeight:'25rpx',
            align: 'center',
            width: `${posWidth-padding}rpx`,
            top: `${startTop + 40}rpx`,
            left:`${posWidth/2}rpx`,
            fontWeight: "bold"
        }
    },
        {
            type: "image",
            url: index.shareImg,
            css: {
                top: `${startTop + 97}rpx`,
                left: "86rpx",
                width: "155rpx",
                height: "155rpx"
            }
        },
        {
            type: "text",
            text: "扫描或长按识别二维码",
            css: {
                fontSize: "14rpx",
                color: "#666666",
                bottom: '30rpx',
                left: "94rpx"
            }
        }
    ];
    return {
        width: `${posWidth}rpx`,
        height: `${posHeight}rpx`,
        background: "#fff",
        borderRadius: "5rpx",
        views: views
    };
}