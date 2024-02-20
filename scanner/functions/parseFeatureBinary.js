function parseFeatureBinary(array, byteOffset, FTJSONLength) {
    // Init geometry
    const geometry = new THREE.BufferGeometry();

    // init Array feature binary
    const subArrayJson = utf8Decoder.decode(new Uint8Array(array, byteOffset, FTJSONLength));
    const parseJSON = JSON.parse(subArrayJson);
    let lengthFeature;
    if (parseJSON.POINTS_LENGTH) {
        lengthFeature = parseJSON.POINTS_LENGTH;
    }
    if (parseJSON.POSITION) {
        const byteOffsetPos = (parseJSON.POSITION.byteOffset + subArrayJson.length + byteOffset);
        const positionArray = new Float32Array(array, byteOffsetPos, lengthFeature * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    }
    if (parseJSON.RGB) {
        const byteOffsetCol = parseJSON.RGB.byteOffset + subArrayJson.length + byteOffset;
        const colorArray = new Uint8Array(array, byteOffsetCol, lengthFeature * 3);
        geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3, true));
    }
    if (parseJSON.POSITION_QUANTIZED) {
        throw new Error('For pnts loader, POSITION_QUANTIZED: not yet managed');
    }
    if (parseJSON.RGBA) {
        throw new Error('For pnts loader, RGBA: not yet managed');
    }
    if (parseJSON.RGB565) {
        throw new Error('For pnts loader, RGB565: not yet managed');
    }
    if (parseJSON.NORMAL) {
        throw new Error('For pnts loader, NORMAL: not yet managed');
    }
    if (parseJSON.NORMAL_OCT16P) {
        throw new Error('For pnts loader, NORMAL_OCT16P: not yet managed');
    }
    if (parseJSON.BATCH_ID) {
        throw new Error('For pnts loader, BATCH_ID: not yet managed');
    }

    // Add RTC feature
    const offset = parseJSON.RTC_CENTER ?
        new THREE.Vector3().fromArray(parseJSON.RTC_CENTER) : undefined;

    return {
        geometry,
        offset,
    };
}