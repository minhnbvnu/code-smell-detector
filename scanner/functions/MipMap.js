function MipMap() {
                TexFlags.call(this);
                this.genMipmaps = false;
                this.mipmapHint = GL_DONT_CARE;
                this.mipmask = 0;
                this.images = Array(16);
            }