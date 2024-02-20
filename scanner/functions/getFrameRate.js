function getFrameRate(frames) {
    frames.sort();
    var range = 0.20;
    var start = parseInt(frames.length * range, 10);
    var end = parseInt(frames.length * (1 - range), 10);
    return (1000 * (end - start)) / (frames[end] - frames[start]);
}