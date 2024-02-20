function isInReferenceCommentWorker(sourceFile, position, shouldBeReference) {
            const range = isInComment(sourceFile, position, 
            /*tokenAtPosition*/
            void 0);
            return !!range && shouldBeReference === tripleSlashDirectivePrefixRegex.test(sourceFile.text.substring(range.pos, range.end));
        }