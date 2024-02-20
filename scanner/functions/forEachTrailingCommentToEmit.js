function forEachTrailingCommentToEmit(end, cb) {
                if (currentSourceFile && (containerEnd === -1 || end !== containerEnd && end !== declarationListContainerEnd)) {
                    forEachTrailingCommentRange(currentSourceFile.text, end, cb);
                }
            }