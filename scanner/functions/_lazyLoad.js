function _lazyLoad(src, loadCallback, errorCallback) {
    var $imgDom = ng.element(new Image());
    loadCallback = ng.isFunction(loadCallback) ? loadCallback : ng.noop;
    errorCallback = ng.isFunction(errorCallback) ? errorCallback : ng.noop;

    $imgDom.bind('error', errorCallback.bind(this)).bind('load', loadCallback.bind(this)).attr('src', src);
}