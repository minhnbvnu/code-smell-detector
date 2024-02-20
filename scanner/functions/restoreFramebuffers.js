function restoreFramebuffers() {
                framebufferState.cur = null;
                framebufferState.next = null;
                framebufferState.dirty = true;
                values(framebufferSet).forEach(function (fb) {
                    fb.framebuffer = gl.createFramebuffer();
                    updateFramebuffer(fb);
                });
            }