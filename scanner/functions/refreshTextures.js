function refreshTextures() {
                for (var i = 0; i < numTexUnits; ++i) {
                    var tex = textureUnits[i];
                    if (tex) {
                        tex.bindCount = 0;
                        tex.unit = -1;
                        textureUnits[i] = null;
                    }
                    gl.activeTexture(GL_TEXTURE0$1 + i);
                    gl.bindTexture(GL_TEXTURE_2D$1, null);
                    gl.bindTexture(GL_TEXTURE_CUBE_MAP$1, null);
                }
            }