function FramebufferAttachment(target, texture, renderbuffer) {
                this.target = target;
                this.texture = texture;
                this.renderbuffer = renderbuffer;
                var w = 0;
                var h = 0;
                if (texture) {
                    w = texture.width;
                    h = texture.height;
                }
                else if (renderbuffer) {
                    w = renderbuffer.width;
                    h = renderbuffer.height;
                }
                this.width = w;
                this.height = h;
            }