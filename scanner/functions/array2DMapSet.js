function array2DMapSet(a, fcn) {
    for (let y = 0; y < a.height; ++y) {
        for (let x = 0; x < a.width; ++x) {
            a.data[x + y * a.width] = fcn(x, y);
        }
    }
}