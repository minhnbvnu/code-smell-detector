function REGLRenderbuffer(renderbuffer) {
                this.id = renderbufferCount++;
                this.refCount = 1;
                this.renderbuffer = renderbuffer;
                this.format = GL_RGBA4$1;
                this.width = 0;
                this.height = 0;
                if (config.profile) {
                    this.stats = { size: 0 };
                }
            }