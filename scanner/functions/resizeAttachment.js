function resizeAttachment(attachment, w, h) {
                if (attachment) {
                    if (attachment.texture) {
                        attachment.texture.resize(w, h);
                    }
                    else if (attachment.renderbuffer) {
                        attachment.renderbuffer.resize(w, h);
                    }
                    attachment.width = w;
                    attachment.height = h;
                }
            }