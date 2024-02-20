function getGuideValues(total, count, width, gutter, margin, margin1, margin2, center) {
    var values = [];
    if (width == 0) {
        width = Math.floor((total - margin1 - margin2 - gutter * (count - 1)) / count);
    }
    var flag = margin1;
    for (var i = 0; i < count; i++) {
        if (center && i == 0) {
            var offset = Math.floor((total - margin1 - margin2 - (width * count + gutter * (count - 1))) / 2) + margin1;
            flag += offset;
        }
        values.push(flag);
        flag += width;
        values.push(flag);
        flag += gutter;
        if (i != count - 1) {
            values.push(flag);
        }
    }

    if (margin == true) {
        values.push(margin1);
        if (flag < total) {
            values.push(total - margin2);
        }
    }

    return values;
}