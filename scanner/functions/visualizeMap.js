function visualizeMap(map) {
    const width  = map.length;
    const height = map[0].length;
    const depth  = map.layer.length;

    // Scale to fit on screen
    const maxDim = Math.max(width * map.sprite_size.x, height * map.sprite_size.y);
    const reduce = (maxDim > 4096) ? 4 : (maxDim > 2048) ? 3 : (maxDim > 1024) ? 2 : 1;

    // Size of destination tiles
    const dstTileX = Math.max(1, Math.floor(map.sprite_size.x / reduce));
    const dstTileY = Math.max(1, Math.floor(map.sprite_size.y / reduce));

    const canvas  = document.getElementById('mapDisplayCanvas');
    canvas.width  = width  * dstTileX;
    canvas.height = height * dstTileY;
    const mapCtx  = canvas.getContext('2d');

    const dstImageData = mapCtx.createImageData(width * dstTileX, height * dstTileY);
    const dstData = new Uint32Array(dstImageData.data.buffer);
    for (let mapZ = 0; mapZ < depth; ++mapZ) {
        const z = map.zScale < 0 ? depth - mapZ - 1 : mapZ;
        for (let mapY = 0; mapY < height; ++mapY) {
            const y = map.$flipYOnLoad ? height - mapY - 1 : mapY;
            for (let mapX = 0; mapX < width; ++mapX) {
                const sprite = map.layer[z][mapX][y];
                if (sprite) {
                    const srcData = sprite.$spritesheet.$uint16Data;
                    const xShift = (sprite.scale.x === -1) ? (sprite.size.x - 1) : 0;
                    const yShift = (sprite.scale.y === -1) ? (sprite.size.y - 1) : 0;
                    const xReduce = reduce * sprite.scale.x;
                    const yReduce = reduce * sprite.scale.y;
                    for (let y = 0; y < dstTileY; ++y) {
                        for (let x = 0; x < dstTileX; ++x) {
                            const srcOffset = (sprite.$x + x * xReduce + xShift) + (sprite.$y + y * yReduce + yShift) * srcData.width;
                            const dstOffset = (x + mapX * dstTileX) + (y + mapY * dstTileY) * dstImageData.width;
                            const srcValue = srcData[srcOffset];
                            if ((srcValue >>> 12) > 7) { // Alpha test
                                dstData[dstOffset] =
                                    0xff000000 +
                                    (((srcValue & 0xf00) + ((srcValue & 0xf00) << 4)) << 8) +
                                    (((srcValue & 0xf0) + ((srcValue & 0xf0) << 4)) << 4) +
                                    (srcValue & 0xf) + ((srcValue & 0xf) << 4);
                            }
                        } // x
                    } // y
                } // sprite
            } // x
        } // y
    } // z

    // Draw dotted grid lines
    for (let mapX = 0; mapX < width; ++mapX) {
        const x = mapX * dstTileX;
        for (let y = 0; y < dstImageData.height; ++y) {
            dstData[x + y * dstImageData.width] = (y & 1) ? 0xffcccccc : 0xff777777
        }
    }

    for (let mapY = 0; mapY < height; ++mapY) {
        const y = mapY * dstTileY;
        for (let x = 0; x < dstImageData.width; ++x) {
            dstData[x + y * dstImageData.width] = (x & 1) ? 0xffcccccc : 0xff777777
        }
    }

    mapCtx.putImageData(dstImageData, 0, 0);
}