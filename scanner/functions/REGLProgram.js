function REGLProgram(fragId, vertId) {
                this.id = PROGRAM_COUNTER++;
                this.fragId = fragId;
                this.vertId = vertId;
                this.program = null;
                this.uniforms = [];
                this.attributes = [];
                this.refCount = 1;
                if (config.profile) {
                    this.stats = {
                        uniformsCount: 0,
                        attributesCount: 0
                    };
                }
            }