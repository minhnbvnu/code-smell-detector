function isPinnedComment(text, start) {
            return text.charCodeAt(start + 1) === 42 /* asterisk */ && text.charCodeAt(start + 2) === 33 /* exclamation */;
        }