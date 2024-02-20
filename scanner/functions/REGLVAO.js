function REGLVAO() {
                this.id = ++vaoCount;
                this.attributes = [];
                this.elements = null;
                this.ownsElements = false;
                this.count = 0;
                this.offset = 0;
                this.instances = -1;
                this.primitive = 4;
                var extension = extVAO();
                if (extension) {
                    this.vao = extension.createVertexArrayOES();
                }
                else {
                    this.vao = null;
                }
                vaoSet[this.id] = this;
                this.buffers = [];
            }