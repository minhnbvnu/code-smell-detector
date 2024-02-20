function checkFramebufferFormat(attachment, texFormats, rbFormats) {
            if (attachment.texture) {
                checkOneOf(attachment.texture._texture.internalformat, texFormats, 'unsupported texture format for attachment');
            }
            else {
                checkOneOf(attachment.renderbuffer._renderbuffer.format, rbFormats, 'unsupported renderbuffer format for attachment');
            }
        }