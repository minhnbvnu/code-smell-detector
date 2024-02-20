function parseTexInfo(info, options) {
                if ('min' in options) {
                    var minFilter = options.min;
                    check$1.parameter(minFilter, minFilters);
                    info.minFilter = minFilters[minFilter];
                    if (MIPMAP_FILTERS.indexOf(info.minFilter) >= 0 && !('faces' in options)) {
                        info.genMipmaps = true;
                    }
                }
                if ('mag' in options) {
                    var magFilter = options.mag;
                    check$1.parameter(magFilter, magFilters);
                    info.magFilter = magFilters[magFilter];
                }
                var wrapS = info.wrapS;
                var wrapT = info.wrapT;
                if ('wrap' in options) {
                    var wrap = options.wrap;
                    if (typeof wrap === 'string') {
                        check$1.parameter(wrap, wrapModes);
                        wrapS = wrapT = wrapModes[wrap];
                    }
                    else if (Array.isArray(wrap)) {
                        check$1.parameter(wrap[0], wrapModes);
                        check$1.parameter(wrap[1], wrapModes);
                        wrapS = wrapModes[wrap[0]];
                        wrapT = wrapModes[wrap[1]];
                    }
                }
                else {
                    if ('wrapS' in options) {
                        var optWrapS = options.wrapS;
                        check$1.parameter(optWrapS, wrapModes);
                        wrapS = wrapModes[optWrapS];
                    }
                    if ('wrapT' in options) {
                        var optWrapT = options.wrapT;
                        check$1.parameter(optWrapT, wrapModes);
                        wrapT = wrapModes[optWrapT];
                    }
                }
                info.wrapS = wrapS;
                info.wrapT = wrapT;
                if ('anisotropic' in options) {
                    var anisotropic = options.anisotropic;
                    check$1(typeof anisotropic === 'number' &&
                        anisotropic >= 1 && anisotropic <= limits.maxAnisotropic, 'aniso samples must be between 1 and ');
                    info.anisotropic = options.anisotropic;
                }
                if ('mipmap' in options) {
                    var hasMipMap = false;
                    switch (typeof options.mipmap) {
                        case 'string':
                            check$1.parameter(options.mipmap, mipmapHint, 'invalid mipmap hint');
                            info.mipmapHint = mipmapHint[options.mipmap];
                            info.genMipmaps = true;
                            hasMipMap = true;
                            break;
                        case 'boolean':
                            hasMipMap = info.genMipmaps = options.mipmap;
                            break;
                        case 'object':
                            check$1(Array.isArray(options.mipmap), 'invalid mipmap type');
                            info.genMipmaps = false;
                            hasMipMap = true;
                            break;
                        default:
                            check$1.raise('invalid mipmap type');
                    }
                    if (hasMipMap && !('min' in options)) {
                        info.minFilter = GL_NEAREST_MIPMAP_NEAREST$1;
                    }
                }
            }