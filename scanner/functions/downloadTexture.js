function downloadTexture(texture, filename, face, flipY_) {         // eslint-disable-line no-unused-vars
    var width;
    var height;
    var data;

    if (texture.cubemap && face === undefined) {
        width = texture.width * 6;
        height = texture.height;
        data = new Uint8ClampedArray(width * height * 4);

        var i, j, k, src, dst;
        for (i = 0; i < 6; ++i) {
            var faceData = readPixels(texture, [1, 4, 0, 5, 2, 3][i]);
            for (j = 0; j < texture.height; ++j) {
                src = j * texture.width * 4;
                dst = j * width * 4 + i * texture.width * 4;
                for (k = 0; k < texture.width; ++k) {
                    data[dst++] = faceData[src++];
                    data[dst++] = faceData[src++];
                    data[dst++] = faceData[src++];
                    data[dst++] = faceData[src++];
                }
            }
        }
    } else {
        width = texture.width;
        height = texture.height;
        data = readPixels(texture, face);
    }

    if (flipY_) {
        flipY(data, width, height);
    }

    download(constructPngUrl(data, width, height), filename);
}