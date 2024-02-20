function unwrapAttachment(attachment) {
                return attachment && (attachment.texture || attachment.renderbuffer);
            }