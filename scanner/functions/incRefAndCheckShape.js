function incRefAndCheckShape(attachment, width, height) {
                if (!attachment) {
                    return;
                }
                if (attachment.texture) {
                    var texture = attachment.texture._texture;
                    var tw = Math.max(1, texture.width);
                    var th = Math.max(1, texture.height);
                    check$1(tw === width && th === height, 'inconsistent width/height for supplied texture');
                    texture.refCount += 1;
                }
                else {
                    var renderbuffer = attachment.renderbuffer._renderbuffer;
                    check$1(renderbuffer.width === width && renderbuffer.height === height, 'inconsistent width/height for renderbuffer');
                    renderbuffer.refCount += 1;
                }
            }