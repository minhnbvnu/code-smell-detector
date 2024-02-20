function decFBORefs(framebuffer) {
                framebuffer.colorAttachments.forEach(decRef);
                decRef(framebuffer.depthAttachment);
                decRef(framebuffer.stencilAttachment);
                decRef(framebuffer.depthStencilAttachment);
            }