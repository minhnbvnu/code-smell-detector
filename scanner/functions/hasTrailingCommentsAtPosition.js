function hasTrailingCommentsAtPosition(pos) {
                let result = false;
                forEachTrailingCommentRange((currentSourceFile == null ? void 0 : currentSourceFile.text) || "", pos + 1, () => result = true);
                return result;
            }