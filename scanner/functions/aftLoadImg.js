function aftLoadImg(obj) {
    let oImg = new Image(), _this = this;
    oImg.src = obj.url;
    oImg.onload = function () {
        obj.dom.src = oImg.src;
        if (obj.fn && isType(obj.fn, 'function')) {
            obj.fn(obj.dom);
        }
    };
    if (obj.errorUrl) {
        oImg.onerror = function () {
            obj.src = obj.errorUrl;
            if (obj.fn && isType(obj.fn, 'function')) {
                obj.fn(obj.dom);
            }
        }
    }
}