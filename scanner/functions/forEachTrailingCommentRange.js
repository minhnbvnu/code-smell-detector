function forEachTrailingCommentRange(text, pos, cb, state) {
            return iterateCommentRanges(
            /*reduce*/
            false, text, pos, 
            /*trailing*/
            true, cb, state);
        }