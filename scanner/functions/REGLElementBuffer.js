function REGLElementBuffer(buffer) {
                this.id = elementCount++;
                elementSet[this.id] = this;
                this.buffer = buffer;
                this.primType = GL_TRIANGLES;
                this.vertCount = 0;
                this.type = 0;
            }