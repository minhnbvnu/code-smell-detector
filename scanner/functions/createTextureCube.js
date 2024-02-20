function createTextureCube(a0, a1, a2, a3, a4, a5) {
                var texture = new REGLTexture(GL_TEXTURE_CUBE_MAP$1);
                textureSet[texture.id] = texture;
                stats.cubeCount++;
                var faces = new Array(6);
                function reglTextureCube(a0, a1, a2, a3, a4, a5) {
                    var i;
                    var texInfo = texture.texInfo;
                    TexInfo.call(texInfo);
                    for (i = 0; i < 6; ++i) {
                        faces[i] = allocMipMap();
                    }
                    if (typeof a0 === 'number' || !a0) {
                        var s = (a0 | 0) || 1;
                        for (i = 0; i < 6; ++i) {
                            parseMipMapFromShape(faces[i], s, s);
                        }
                    }
                    else if (typeof a0 === 'object') {
                        if (a1) {
                            parseMipMapFromObject(faces[0], a0);
                            parseMipMapFromObject(faces[1], a1);
                            parseMipMapFromObject(faces[2], a2);
                            parseMipMapFromObject(faces[3], a3);
                            parseMipMapFromObject(faces[4], a4);
                            parseMipMapFromObject(faces[5], a5);
                        }
                        else {
                            parseTexInfo(texInfo, a0);
                            parseFlags(texture, a0);
                            if ('faces' in a0) {
                                var faceInput = a0.faces;
                                check$1(Array.isArray(faceInput) && faceInput.length === 6, 'cube faces must be a length 6 array');
                                for (i = 0; i < 6; ++i) {
                                    check$1(typeof faceInput[i] === 'object' && !!faceInput[i], 'invalid input for cube map face');
                                    copyFlags(faces[i], texture);
                                    parseMipMapFromObject(faces[i], faceInput[i]);
                                }
                            }
                            else {
                                for (i = 0; i < 6; ++i) {
                                    parseMipMapFromObject(faces[i], a0);
                                }
                            }
                        }
                    }
                    else {
                        check$1.raise('invalid arguments to cube map');
                    }
                    copyFlags(texture, faces[0]);
                    check$1.optional(function () {
                        if (!limits.npotTextureCube) {
                            check$1(isPow2$1(texture.width) && isPow2$1(texture.height), 'your browser does not support non power or two texture dimensions');
                        }
                    });
                    if (texInfo.genMipmaps) {
                        texture.mipmask = (faces[0].width << 1) - 1;
                    }
                    else {
                        texture.mipmask = faces[0].mipmask;
                    }
                    check$1.textureCube(texture, texInfo, faces, limits);
                    texture.internalformat = faces[0].internalformat;
                    reglTextureCube.width = faces[0].width;
                    reglTextureCube.height = faces[0].height;
                    tempBind(texture);
                    for (i = 0; i < 6; ++i) {
                        setMipMap(faces[i], GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i);
                    }
                    setTexInfo(texInfo, GL_TEXTURE_CUBE_MAP$1);
                    tempRestore();
                    if (config.profile) {
                        texture.stats.size = getTextureSize(texture.internalformat, texture.type, reglTextureCube.width, reglTextureCube.height, texInfo.genMipmaps, true);
                    }
                    reglTextureCube.format = textureFormatsInvert[texture.internalformat];
                    reglTextureCube.type = textureTypesInvert[texture.type];
                    reglTextureCube.mag = magFiltersInvert[texInfo.magFilter];
                    reglTextureCube.min = minFiltersInvert[texInfo.minFilter];
                    reglTextureCube.wrapS = wrapModesInvert[texInfo.wrapS];
                    reglTextureCube.wrapT = wrapModesInvert[texInfo.wrapT];
                    for (i = 0; i < 6; ++i) {
                        freeMipMap(faces[i]);
                    }
                    return reglTextureCube;
                }
                function subimage(face, image, x_, y_, level_) {
                    check$1(!!image, 'must specify image data');
                    check$1(typeof face === 'number' && face === (face | 0) &&
                        face >= 0 && face < 6, 'invalid face');
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
                    setSubImage(imageData, GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + face, x, y, level);
                    tempRestore();
                    freeImage(imageData);
                    return reglTextureCube;
                }
                function resize(radius_) {
                    var radius = radius_ | 0;
                    if (radius === texture.width) {
                        return;
                    }
                    reglTextureCube.width = texture.width = radius;
                    reglTextureCube.height = texture.height = radius;
                    tempBind(texture);
                    for (var i = 0; i < 6; ++i) {
                        for (var j = 0; texture.mipmask >> j; ++j) {
                            gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i, j, texture.format, radius >> j, radius >> j, 0, texture.format, texture.type, null);
                        }
                    }
                    tempRestore();
                    if (config.profile) {
                        texture.stats.size = getTextureSize(texture.internalformat, texture.type, reglTextureCube.width, reglTextureCube.height, false, true);
                    }
                    return reglTextureCube;
                }
                reglTextureCube(a0, a1, a2, a3, a4, a5);
                reglTextureCube.subimage = subimage;
                reglTextureCube.resize = resize;
                reglTextureCube._reglType = 'textureCube';
                reglTextureCube._texture = texture;
                if (config.profile) {
                    reglTextureCube.stats = texture.stats;
                }
                reglTextureCube.destroy = function () {
                    texture.decRef();
                };
                return reglTextureCube;
            }