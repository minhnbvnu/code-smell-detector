function REGLBuffer(type) {
                this.id = bufferCount++;
                this.buffer = gl.createBuffer();
                this.type = type;
                this.usage = GL_STATIC_DRAW;
                this.byteLength = 0;
                this.dimension = 1;
                this.dtype = GL_UNSIGNED_BYTE$3;
                this.persistentData = null;
                if (config.profile) {
                    this.stats = { size: 0 };
                }
            }