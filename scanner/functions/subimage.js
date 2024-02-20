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