function reglTexture2D(a, b) {
                    var texInfo = texture.texInfo;
                    TexInfo.call(texInfo);
                    var mipData = allocMipMap();
                    if (typeof a === 'number') {
                        if (typeof b === 'number') {
                            parseMipMapFromShape(mipData, a | 0, b | 0);
                        }
                        else {
                            parseMipMapFromShape(mipData, a | 0, a | 0);
                        }
                    }
                    else if (a) {
                        check$1.type(a, 'object', 'invalid arguments to regl.texture');
                        parseTexInfo(texInfo, a);
                        parseMipMapFromObject(mipData, a);
                    }
                    else {
                        // empty textures get assigned a default shape of 1x1
                        parseMipMapFromShape(mipData, 1, 1);
                    }
                    if (texInfo.genMipmaps) {
                        mipData.mipmask = (mipData.width << 1) - 1;
                    }
                    texture.mipmask = mipData.mipmask;
                    copyFlags(texture, mipData);
                    check$1.texture2D(texInfo, mipData, limits);
                    texture.internalformat = mipData.internalformat;
                    reglTexture2D.width = mipData.width;
                    reglTexture2D.height = mipData.height;
                    tempBind(texture);
                    setMipMap(mipData, GL_TEXTURE_2D$1);
                    setTexInfo(texInfo, GL_TEXTURE_2D$1);
                    tempRestore();
                    freeMipMap(mipData);
                    if (config.profile) {
                        texture.stats.size = getTextureSize(texture.internalformat, texture.type, mipData.width, mipData.height, texInfo.genMipmaps, false);
                    }
                    reglTexture2D.format = textureFormatsInvert[texture.internalformat];
                    reglTexture2D.type = textureTypesInvert[texture.type];
                    reglTexture2D.mag = magFiltersInvert[texInfo.magFilter];
                    reglTexture2D.min = minFiltersInvert[texInfo.minFilter];
                    reglTexture2D.wrapS = wrapModesInvert[texInfo.wrapS];
                    reglTexture2D.wrapT = wrapModesInvert[texInfo.wrapT];
                    return reglTexture2D;
                }