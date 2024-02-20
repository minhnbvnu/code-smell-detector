function parseMipMapFromObject(mipmap, options) {
                var imgData = null;
                if (isPixelData(options)) {
                    imgData = mipmap.images[0] = allocImage();
                    copyFlags(imgData, mipmap);
                    parseImage(imgData, options);
                    mipmap.mipmask = 1;
                }
                else {
                    parseFlags(mipmap, options);
                    if (Array.isArray(options.mipmap)) {
                        var mipData = options.mipmap;
                        for (var i = 0; i < mipData.length; ++i) {
                            imgData = mipmap.images[i] = allocImage();
                            copyFlags(imgData, mipmap);
                            imgData.width >>= i;
                            imgData.height >>= i;
                            parseImage(imgData, mipData[i]);
                            mipmap.mipmask |= (1 << i);
                        }
                    }
                    else {
                        imgData = mipmap.images[0] = allocImage();
                        copyFlags(imgData, mipmap);
                        parseImage(imgData, options);
                        mipmap.mipmask = 1;
                    }
                }
                copyFlags(mipmap, mipmap.images[0]);
                // For textures of the compressed format WEBGL_compressed_texture_s3tc
                // we must have that
                //
                // "When level equals zero width and height must be a multiple of 4.
                // When level is greater than 0 width and height must be 0, 1, 2 or a multiple of 4. "
                //
                // but we do not yet support having multiple mipmap levels for compressed textures,
                // so we only test for level zero.
                if (mipmap.compressed &&
                    (mipmap.internalformat === GL_COMPRESSED_RGB_S3TC_DXT1_EXT ||
                        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT1_EXT ||
                        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT3_EXT ||
                        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT5_EXT)) {
                    check$1(mipmap.width % 4 === 0 && mipmap.height % 4 === 0, 'for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4');
                }
            }