function decRef(attachment) {
                if (attachment) {
                    if (attachment.texture) {
                        attachment.texture._texture.decRef();
                    }
                    if (attachment.renderbuffer) {
                        attachment.renderbuffer._renderbuffer.decRef();
                    }
                }
            }