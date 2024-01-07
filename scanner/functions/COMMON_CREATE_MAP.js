function COMMON_CREATE_MAP(center, baseLayer, options) {
    var container = document.createElement('div');
    container.id = 'test_container';
    container.style.width = (options && options.width || 80) + 'px';
    container.style.height = (options && options.height || 60) + 'px';
    document.body.appendChild(container);
    var option = {
        zoomAnimationDuration: 50,
        zoom: 17,
        center: center,
        // centerCross : true
    };
    if (options) {
        delete options.width;
        delete options.height;
        for (var p in options) {
            if (options.hasOwnProperty(p)) {
                option[p] = options[p];
            }
        }
    }
    if (baseLayer) {
        option.baseLayer = baseLayer;
    }
    maptalks.Browser.isTest = true;
    var map = new maptalks.Map(container, option);
    return {
        'container': container,
        'map': map
    };
}