function checkTextureCube(texture, info, faces, limits) {
            var w = texture.width;
            var h = texture.height;
            var c = texture.channels;
            // Check texture shape
            check(w > 0 && w <= limits.maxTextureSize && h > 0 && h <= limits.maxTextureSize, 'invalid texture shape');
            check(w === h, 'cube map must be square');
            check(info.wrapS === GL_CLAMP_TO_EDGE && info.wrapT === GL_CLAMP_TO_EDGE, 'wrap mode not supported by cube map');
            for (var i = 0; i < faces.length; ++i) {
                var face = faces[i];
                check(face.width === w && face.height === h, 'inconsistent cube map face shape');
                if (info.genMipmaps) {
                    check(!face.compressed, 'can not generate mipmap for compressed textures');
                    check(face.mipmask === 1, 'can not specify mipmaps and generate mipmaps');
                }
                else {
                    // TODO: check mip and filter mode
                }
                var mipmaps = face.images;
                for (var j = 0; j < 16; ++j) {
                    var img = mipmaps[j];
                    if (img) {
                        var mw = w >> j;
                        var mh = h >> j;
                        check(face.mipmask & (1 << j), 'missing mipmap data');
                        check(img.width === mw &&
                            img.height === mh, 'invalid shape for mip images');
                        check(img.format === texture.format &&
                            img.internalformat === texture.internalformat &&
                            img.type === texture.type, 'incompatible type for mip image');
                        if (img.compressed) {
                            // TODO: check size for compressed images
                        }
                        else if (img.data) {
                            check(img.data.byteLength === mw * mh *
                                Math.max(pixelSize(img.type, c), img.unpackAlignment), 'invalid data for image, buffer size is inconsistent with image format');
                        }
                        else if (img.element) {
                            // TODO: check element can be loaded
                        }
                        else if (img.copy) {
                            // TODO: check compatible format and type
                        }
                    }
                }
            }
        }