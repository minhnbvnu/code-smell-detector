function getImageData4Bit(image, region, full32bitoutput) {
    // Make a uint32 aliased version
    const dataRaw = new Uint32Array(getImageData(image).data.buffer);
    dataRaw.width = image.width;
    dataRaw.height = image.height;

    let data = dataRaw;
    if (region && ((region.corner.x !== 0) || (region.corner.y !== 0) || (region.size.x !== image.width) || (region.size.y !== image.height))) {
        // Crop
        data = new Uint32Array(region.size.x * region.size.y);
        data.width = region.size.x;
        data.height = region.size.y;

        for (let y = 0; y < data.height; ++y) {
            const srcOffset = (y + region.corner.y) * dataRaw.width + region.corner.x;
            data.set(dataRaw.slice(srcOffset, srcOffset + data.width), y * data.width);
        }
    }

    // Used by scalepix
    if (full32bitoutput) { return data; }
    
    // Quantize
    const N = data.length;

    const result = new Uint16Array(N);
    result.height = data.height;
    result.width = data.width;
    for (let i = 0; i < N; ++i) {
        // Debug endianness
        //console.log('0x' + a[i].toString(16) + ' : [0]=' + spritesheet.data[4*i] + ', [1] = '+ spritesheet.data[4*i+1] + ', [2] = '+ spritesheet.data[4*i+2] + ', [3] = '+ spritesheet.data[4*i+3]);
        const c = data[i] >> 4;
        result[i] = ((c & 0xf000000) >> 12) | ((c & 0xf0000) >> 8) | ((c & 0xf00) >> 4) | c & 0xf;
    }

    return result;
}