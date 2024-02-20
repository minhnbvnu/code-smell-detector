function reduceEachTrailingCommentRange(text, pos, cb, state, initial) {
            return iterateCommentRanges(
            /*reduce*/
            true, text, pos, 
            /*trailing*/
            true, cb, state, initial);
        }