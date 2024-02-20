function isTripleSlashComment(commentPos, commentEnd) {
                return !!currentSourceFile && isRecognizedTripleSlashComment(currentSourceFile.text, commentPos, commentEnd);
            }