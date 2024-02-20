function reduceEachLeadingCommentRange(text, pos, cb, state, initial) {
            return iterateCommentRanges(
            /*reduce*/
            true, text, pos, 
            /*trailing*/
            false, cb, state, initial);
        }