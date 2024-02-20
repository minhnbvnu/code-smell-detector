function lazyLoadImg(className = 'ec-load-img', num = 0, errorUrl = null) {
    let oImgLoad = document.getElementsByClassName(className), _this = this, _src = '';
    for (let i = 0, len = oImgLoad.length; i < len; i++) {
        //如果图片已经滚动到指定的高度
        if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - num && !oImgLoad[i].isLoad) {
            //记录图片是否已经加载
            oImgLoad[i].isLoad = true;
            //设置过渡，当图片下来的时候有一个图片透明度变化
            oImgLoad[i].style.cssText = "transition: ''; opacity: 0;";
            oImgLoad[i].style.transition = "";
            oImgLoad[i].style.opacity = "0";
            _src = oImgLoad[i].dataset ? oImgLoad[i].dataset.src : oImgLoad[i].getAttribute("data-src");
            aftLoadImg({
                dom: oImgLoad[i],
                url: _src,
                errorUrl: errorUrl,
                fn: function (o) {
                    //添加定时器，确保图片已经加载完了，一秒后再把图片指定的css样式清掉
                    setTimeout(() => {
                        if (o.isLoad) {
                            o.style.transition = "";
                        }
                    }, 1000)
                }
            });
            //加上动画，透明度样式
            (function (i) {
                setTimeout(() => {
                    oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                }, 16)
            })(i);
        }
    }
}