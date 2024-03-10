function checkTexture2D(info, mipData, limits) {
            var i;
            var w = mipData.width;
            var h = mipData.height;
            var c = mipData.channels;
            // Check texture shape
            check(w > 0 && w <= limits.maxTextureSize &&
                h > 0 && h <= limits.maxTextureSize, 'invalid texture shape');
            // check wrap mode
            if (info.wrapS !== GL_CLAMP_TO_EDGE || info.wrapT !== GL_CLAMP_TO_EDGE) {
                check(isPow2(w) && isPow2(h), 'incompatible wrap mode for texture, both width and height must be power of 2');
            }
            if (mipData.mipmask === 1) {
                if (w !== 1 && h !== 1) {
                    check(info.minFilter !== GL_NEAREST_MIPMAP_NEAREST &&
                        info.minFilter !== GL_NEAREST_MIPMAP_LINEAR &&
                        info.minFilter !== GL_LINEAR_MIPMAP_NEAREST &&
                        info.minFilter !== GL_LINEAR_MIPMAP_LINEAR, 'min filter requires mipmap');
                }
            }
            else {
                // texture must be power of 2
                check(isPow2(w) && isPow2(h), 'texture must be a square power of 2 to support mipmapping');
                check(mipData.mipmask === (w << 1) - 1, 'missing or incomplete mipmap data');
            }
            if (mipData.type === GL_FLOAT) {
                if (limits.extensions.indexOf('oes_texture_float_linear') < 0) {
                    check(info.minFilter === GL_NEAREST && info.magFilter === GL_NEAREST, 'filter not supported, must enable oes_texture_float_linear');
                }
                check(!info.genMipmaps, 'mipmap generation not supported with float textures');
            }
            // check image complete
            var mipimages = mipData.images;
            for (i = 0; i < 16; ++i) {
                if (mipimages[i]) {
                    var mw = w >> i;
                    var mh = h >> i;
                    check(mipData.mipmask & (1 << i), 'missing mipmap data');
                    var img = mipimages[i];
                    check(img.width === mw &&
                        img.height === mh, 'invalid shape for mip images');
                    check(img.format === mipData.format &&
                        img.internalformat === mipData.internalformat &&
                        img.type === mipData.type, 'incompatible type for mip image');
                    if (img.compressed) {
                        // TODO: check size for compressed images
                    }
                    else if (img.data) {
                        // check(img.data.byteLength === mw * mh *
                        // Math.max(pixelSize(img.type, c), img.unpackAlignment),
                        var rowSize = Math.ceil(pixelSize(img.type, c) * mw / img.unpackAlignment) * img.unpackAlignment;
                        check(img.data.byteLength === rowSize * mh, 'invalid data for image, buffer size is inconsistent with image format');
                    }
                    else if (img.element) {
                        // TODO: check element can be loaded
                    }
                    else if (img.copy) {
                        // TODO: check compatible format and type
                    }
                }
                else if (!info.genMipmaps) {
                    check((mipData.mipmask & (1 << i)) === 0, 'extra mipmap data');
                }
            }
            if (mipData.compressed) {
                check(!info.genMipmaps, 'mipmap generation for compressed images not supported');
            }
        }