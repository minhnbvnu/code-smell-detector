function getBinaryImageData(image) {
    const imageData = getImageData(image);

    // Extract and copy
    const N = (imageData.data.length / 4) | 0;
    const pixelData = array2DUint8(image.width, image.height);
    for (let i = 0; i < N; ++i) {
        pixelData.data[i] = (imageData.data[i * 4] >= 128) ? 255 : 0;
    }
    
    return pixelData;
}