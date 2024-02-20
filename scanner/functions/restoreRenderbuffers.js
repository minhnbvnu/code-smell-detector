function restoreRenderbuffers() {
                values(renderbufferSet).forEach(function (rb) {
                    rb.renderbuffer = gl.createRenderbuffer();
                    gl.bindRenderbuffer(GL_RENDERBUFFER, rb.renderbuffer);
                    gl.renderbufferStorage(GL_RENDERBUFFER, rb.format, rb.width, rb.height);
                });
                gl.bindRenderbuffer(GL_RENDERBUFFER, null);
            }