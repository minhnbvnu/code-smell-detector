function clearLayerName(arg_layer, callback) {

    var count = 0;

    if(/copy( \d+)?$/gi.test(arg_layer.name())) {
        var newLayerName = arg_layer.name().replace(/ copy( \d+)?/gi, '');
        arg_layer.setName(newLayerName);
        count ++;
    }
    if(/备份( \d+)?$/gi.test(arg_layer.name())) {
        var newLayerName = arg_layer.name().replace(/(\s)?备份( \d+)?/gi, '');
        arg_layer.setName(newLayerName);
        count ++;
    }
    if(
        /^(Rectangle|Oval|Star|Polygon|Triangle|Line|Path)( \d+)/i.test(arg_layer.name()) ||
        /^(矩形|椭圆形|星形|多边形|三角形|直线|路径)( \d+)/i.test(arg_layer.name())
    ) {
        var newLayerName = arg_layer.name().replace(/( \d+)$/i, '');
        arg_layer.setName(newLayerName);
        count ++;
    }
    if (/^\s+/.test(arg_layer.name()) || /\s+$/.test(arg_layer.name())) {
        arg_layer.setName(arg_layer.name().trim());
    }

    callback(count);
}