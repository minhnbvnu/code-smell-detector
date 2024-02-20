function _readTextureValueAt(metadata, texture, ...uv) {
    for (let i = 0; i < uv.length; i += 2) {
        uv[i] = THREE.MathUtils.clamp(uv[i], 0, texture.image.width - 1);
        uv[i + 1] = THREE.MathUtils.clamp(uv[i + 1], 0, texture.image.height - 1);
    }

    if (texture.image.data) {
        // read a single value
        if (uv.length === 2) {
            const v = texture.image.data[uv[1] * texture.image.width + uv[0]];
            return v != metadata.noDataValue ? v : undefined;
        }
        // or read multiple values
        const result = [];
        for (let i = 0; i < uv.length; i += 2) {
            const v = texture.image.data[uv[i + 1] * texture.image.width + uv[i]];
            result.push(v != metadata.noDataValue ? v : undefined);
        }
        return result;
    } else {
        if (!_canvas) {
            _canvas = document.createElement('canvas');
            _canvas.width = 2;
            _canvas.height = 2;
        }
        let minx = Infinity;
        let miny = Infinity;
        let maxx = -Infinity;
        let maxy = -Infinity;
        for (let i = 0; i < uv.length; i += 2) {
            minx = Math.min(uv[i], minx);
            miny = Math.min(uv[i + 1], miny);
            maxx = Math.max(uv[i], maxx);
            maxy = Math.max(uv[i + 1], maxy);
        }
        const dw = maxx - minx + 1;
        const dh = maxy - miny + 1;
        _canvas.width = Math.max(_canvas.width, dw);
        _canvas.height = Math.max(_canvas.height, dh);

        const ctx = _canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(texture.image, minx, miny, dw, dh, 0, 0, dw, dh);
        const d = ctx.getImageData(0, 0, dw, dh);

        const result = [];
        for (let i = 0; i < uv.length; i += 2) {
            const ox = uv[i] - minx;
            const oy = uv[i + 1] - miny;

            // d is 4 bytes per pixel
            const v = THREE.MathUtils.lerp(
                metadata.colorTextureElevationMinZ,
                metadata.colorTextureElevationMaxZ,
                d.data[4 * oy * dw + 4 * ox] / 255);
            result.push(v != metadata.noDataValue ? v : undefined);
        }
        if (uv.length === 2) {
            return result[0];
        } else {
            return result;
        }
    }
}