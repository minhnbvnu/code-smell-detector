function getPasteImgs(e) {
    var result = [];
    var txt = getPasteText(e);
    if (txt) {
        // 有文字，就忽略图片
        return result;
    }

    var clipboardData = e.clipboardData || e.originalEvent && e.originalEvent.clipboardData || {};
    var items = clipboardData.items;
    if (!items) {
        return result;
    }

    objForEach(items, function (key, value) {
        var type = value.type;
        if (/image/i.test(type)) {
            result.push(value.getAsFile());
        }
    });

    return result;
}