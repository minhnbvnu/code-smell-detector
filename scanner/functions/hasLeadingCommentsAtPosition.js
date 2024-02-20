function hasLeadingCommentsAtPosition(pos) {
                let result = false;
                forEachLeadingCommentRange((currentSourceFile == null ? void 0 : currentSourceFile.text) || "", pos + 1, () => result = true);
                return result;
            }