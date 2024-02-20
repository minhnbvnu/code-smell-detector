function tempRestore() {
                var prev = textureUnits[0];
                if (prev) {
                    gl.bindTexture(prev.target, prev.texture);
                }
                else {
                    gl.bindTexture(GL_TEXTURE_2D$1, null);
                }
            }