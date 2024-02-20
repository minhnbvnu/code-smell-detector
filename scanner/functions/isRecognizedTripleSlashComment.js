function isRecognizedTripleSlashComment(text, commentPos, commentEnd) {
            if (text.charCodeAt(commentPos + 1) === 47 /* slash */ && commentPos + 2 < commentEnd && text.charCodeAt(commentPos + 2) === 47 /* slash */) {
                const textSubStr = text.substring(commentPos, commentEnd);
                return fullTripleSlashReferencePathRegEx.test(textSubStr) || fullTripleSlashAMDReferencePathRegEx.test(textSubStr) || fullTripleSlashReferenceTypeReferenceDirectiveRegEx.test(textSubStr) || defaultLibReferenceRegEx.test(textSubStr) ? true : false;
            }
            return false;
        }