function restoreTextures() {
                for (var i = 0; i < numTexUnits; ++i) {
                    var tex = textureUnits[i];
                    if (tex) {
                        tex.bindCount = 0;
                        tex.unit = -1;
                        textureUnits[i] = null;
                    }
                }
                values(textureSet).forEach(function (texture) {
                    texture.texture = gl.createTexture();
                    gl.bindTexture(texture.target, texture.texture);
                    for (var i = 0; i < 32; ++i) {
                        if ((texture.mipmask & (1 << i)) === 0) {
                            continue;
                        }
                        if (texture.target === GL_TEXTURE_2D$1) {
                            gl.texImage2D(GL_TEXTURE_2D$1, i, texture.internalformat, texture.width >> i, texture.height >> i, 0, texture.internalformat, texture.type, null);
                        }
                        else {
                            for (var j = 0; j < 6; ++j) {
                                gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + j, i, texture.internalformat, texture.width >> i, texture.height >> i, 0, texture.internalformat, texture.type, null);
                            }
                        }
                    }
                    setTexInfo(texture.texInfo, texture.target);
                });
            }