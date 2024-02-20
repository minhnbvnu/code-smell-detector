function REGLFramebuffer() {
                this.id = framebufferCount++;
                framebufferSet[this.id] = this;
                this.framebuffer = gl.createFramebuffer();
                this.width = 0;
                this.height = 0;
                this.colorAttachments = [];
                this.depthAttachment = null;
                this.stencilAttachment = null;
                this.depthStencilAttachment = null;
            }