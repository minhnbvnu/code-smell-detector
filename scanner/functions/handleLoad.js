function handleLoad(dom) {
        dom.src = dom.dataset ? dom.dataset.src : dom.getAttribute("data-src");
        dom.onerror = dom.onload = function () {
            now++
            console.log(now, len)
            //如果还有图片待加载
            if (_dom.length > 0) {
                //递归调用加载
                handleLoad(_dom.shift());
            }
            else {
                cb && cb();
            }
        }
    }