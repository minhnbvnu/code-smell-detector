function updateFramebuffer(framebuffer) {
                var i;
                gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebuffer.framebuffer);
                var colorAttachments = framebuffer.colorAttachments;
                for (i = 0; i < colorAttachments.length; ++i) {
                    attach(GL_COLOR_ATTACHMENT0$1 + i, colorAttachments[i]);
                }
                for (i = colorAttachments.length; i < limits.maxColorAttachments; ++i) {
                    gl.framebufferTexture2D(GL_FRAMEBUFFER$1, GL_COLOR_ATTACHMENT0$1 + i, GL_TEXTURE_2D$2, null, 0);
                }
                gl.framebufferTexture2D(GL_FRAMEBUFFER$1, GL_DEPTH_STENCIL_ATTACHMENT, GL_TEXTURE_2D$2, null, 0);
                gl.framebufferTexture2D(GL_FRAMEBUFFER$1, GL_DEPTH_ATTACHMENT, GL_TEXTURE_2D$2, null, 0);
                gl.framebufferTexture2D(GL_FRAMEBUFFER$1, GL_STENCIL_ATTACHMENT, GL_TEXTURE_2D$2, null, 0);
                attach(GL_DEPTH_ATTACHMENT, framebuffer.depthAttachment);
                attach(GL_STENCIL_ATTACHMENT, framebuffer.stencilAttachment);
                attach(GL_DEPTH_STENCIL_ATTACHMENT, framebuffer.depthStencilAttachment);
                // Check status code
                var status = gl.checkFramebufferStatus(GL_FRAMEBUFFER$1);
                if (!gl.isContextLost() && status !== GL_FRAMEBUFFER_COMPLETE$1) {
                    check$1.raise('framebuffer configuration not supported, status = ' +
                        statusCode[status]);
                }
                gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebufferState.next ? framebufferState.next.framebuffer : null);
                framebufferState.cur = framebufferState.next;
                // FIXME: Clear error code here.  This is a work around for a bug in
                // headless-gl
                gl.getError();
            }