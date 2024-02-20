function array2DUint8(w, h) {
    console.assert(w > 0 && h > 0);
    return Object.seal({width:w, height:h, data:new Uint8Array(w * h)});
}