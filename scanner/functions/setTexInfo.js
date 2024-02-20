function setTexInfo(info, target) {
                gl.texParameteri(target, GL_TEXTURE_MIN_FILTER, info.minFilter);
                gl.texParameteri(target, GL_TEXTURE_MAG_FILTER, info.magFilter);
                gl.texParameteri(target, GL_TEXTURE_WRAP_S, info.wrapS);
                gl.texParameteri(target, GL_TEXTURE_WRAP_T, info.wrapT);
                if (extensions.ext_texture_filter_anisotropic) {
                    gl.texParameteri(target, GL_TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);
                }
                if (info.genMipmaps) {
                    gl.hint(GL_GENERATE_MIPMAP_HINT, info.mipmapHint);
                    gl.generateMipmap(target);
                }
            }