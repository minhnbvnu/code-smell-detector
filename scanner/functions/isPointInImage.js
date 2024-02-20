function isPointInImage(x, y, w, h, img) {
    x = x | 0;
    y = y | 0;
    if(x < 0 || y < 0) {
        return false;
    }
    if(x > w || y > h) {
        return false;
    }

    var imgd;
    if(!image_data_cache[img.src]) {
        var canvas = global.document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.width;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        imgd = ctx.getImageData(0, 0, img.width, img.height);
        image_data_cache[img.src] = imgd;
    } else {
        imgd = image_data_cache[img.src];
    }

    var index = (y *  img.width * 4 + x * 4) + 3;
    var alpha = imgd.data[index];

    return alpha > 50;
}