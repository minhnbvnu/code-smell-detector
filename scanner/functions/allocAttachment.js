function allocAttachment(width, height, isTexture, format, type) {
                if (isTexture) {
                    var texture = textureState.create2D({
                        width: width,
                        height: height,
                        format: format,
                        type: type
                    });
                    texture._texture.refCount = 0;
                    return new FramebufferAttachment(GL_TEXTURE_2D$2, texture, null);
                }
                else {
                    var rb = renderbufferState.create({
                        width: width,
                        height: height,
                        format: format
                    });
                    rb._renderbuffer.refCount = 0;
                    return new FramebufferAttachment(GL_RENDERBUFFER$1, null, rb);
                }
            }