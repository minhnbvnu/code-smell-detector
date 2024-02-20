function readAni(contents) {
    var _a;
    var ani = parser_1.parseAni(contents);
    var rate = (_a = ani.rate) !== null && _a !== void 0 ? _a : ani.images.map(function () { return ani.metadata.iDispRate; });
    var duration = sum(rate);
    var frames = ani.images.map(function (image) { return ({
        url: curUrlFromByteArray(image),
        percents: [],
    }); });
    var elapsed = 0;
    rate.forEach(function (r, i) {
        var frameIdx = ani.seq ? ani.seq[i] : i;
        frames[frameIdx].percents.push((elapsed / duration) * 100);
        elapsed += r;
    });
    return { duration: duration * JIFFIES_PER_MS, frames: frames };
}