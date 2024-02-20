function parseAttachment(attachment) {
                var target = GL_TEXTURE_2D$2;
                var texture = null;
                var renderbuffer = null;
                var data = attachment;
                if (typeof attachment === 'object') {
                    data = attachment.data;
                    if ('target' in attachment) {
                        target = attachment.target | 0;
                    }
                }
                check$1.type(data, 'function', 'invalid attachment data');
                var type = data._reglType;
                if (type === 'texture2d') {
                    texture = data;
                    check$1(target === GL_TEXTURE_2D$2);
                }
                else if (type === 'textureCube') {
                    texture = data;
                    check$1(target >= GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 &&
                        target < GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 + 6, 'invalid cube map target');
                }
                else if (type === 'renderbuffer') {
                    renderbuffer = data;
                    target = GL_RENDERBUFFER$1;
                }
                else {
                    check$1.raise('invalid regl object for attachment');
                }
                return new FramebufferAttachment(target, texture, renderbuffer);
            }