function REGLTexture(target) {
                TexFlags.call(this);
                this.mipmask = 0;
                this.internalformat = GL_RGBA$1;
                this.id = textureCount++;
                this.refCount = 1;
                this.target = target;
                this.texture = gl.createTexture();
                this.unit = -1;
                this.bindCount = 0;
                this.texInfo = new TexInfo();
                if (config.profile) {
                    this.stats = { size: 0 };
                }
            }