function createTexture2D(a, b) {
                var texture = new REGLTexture(GL_TEXTURE_2D$1);
                textureSet[texture.id] = texture;
                stats.textureCount++;
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
                function subimage(image, x_, y_, level_) {
                    check$1(!!image, 'must specify image data');
                    var x = x_ | 0;
                    var y = y_ | 0;
                    var level = level_ | 0;
                    var imageData = allocImage();
                    copyFlags(imageData, texture);
                    imageData.width = 0;
                    imageData.height = 0;
                    parseImage(imageData, image);
                    imageData.width = imageData.width || ((texture.width >> level) - x);
                    imageData.height = imageData.height || ((texture.height >> level) - y);
                    check$1(texture.type === imageData.type &&
                        texture.format === imageData.format &&
                        texture.internalformat === imageData.internalformat, 'incompatible format for texture.subimage');
                    check$1(x >= 0 && y >= 0 &&
                        x + imageData.width <= texture.width &&
                        y + imageData.height <= texture.height, 'texture.subimage write out of bounds');
                    check$1(texture.mipmask & (1 << level), 'missing mipmap data');
                    check$1(imageData.data || imageData.element || imageData.needsCopy, 'missing image data');
                    tempBind(texture);
                    setSubImage(imageData, GL_TEXTURE_2D$1, x, y, level);
                    tempRestore();
                    freeImage(imageData);
                    return reglTexture2D;
                }
                function resize(w_, h_) {
                    var w = w_ | 0;
                    var h = (h_ | 0) || w;
                    if (w === texture.width && h === texture.height) {
                        return reglTexture2D;
                    }
                    reglTexture2D.width = texture.width = w;
                    reglTexture2D.height = texture.height = h;
                    tempBind(texture);
                    for (var i = 0; texture.mipmask >> i; ++i) {
                        var _w = w >> i;
                        var _h = h >> i;
                        if (!_w || !_h)
                            break;
                        gl.texImage2D(GL_TEXTURE_2D$1, i, texture.format, _w, _h, 0, texture.format, texture.type, null);
                    }
                    tempRestore();
                    // also, recompute the texture size.
                    if (config.profile) {
                        texture.stats.size = getTextureSize(texture.internalformat, texture.type, w, h, false, false);
                    }
                    return reglTexture2D;
                }
                reglTexture2D(a, b);
                reglTexture2D.subimage = subimage;
                reglTexture2D.resize = resize;
                reglTexture2D._reglType = 'texture2d';
                reglTexture2D._texture = texture;
                if (config.profile) {
                    reglTexture2D.stats = texture.stats;
                }
                reglTexture2D.destroy = function () {
                    texture.decRef();
                };
                return reglTexture2D;
            }