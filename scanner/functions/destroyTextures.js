function destroyTextures() {
                for (var i = 0; i < numTexUnits; ++i) {
                    gl.activeTexture(GL_TEXTURE0$1 + i);
                    gl.bindTexture(GL_TEXTURE_2D$1, null);
                    textureUnits[i] = null;
                }
                values(textureSet).forEach(destroy);
                stats.cubeCount = 0;
                stats.textureCount = 0;
            }