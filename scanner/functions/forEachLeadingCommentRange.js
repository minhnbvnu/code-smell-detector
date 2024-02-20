function forEachLeadingCommentRange(text, pos, cb, state) {
            return iterateCommentRanges(
            /*reduce*/
            false, text, pos, 
            /*trailing*/
            false, cb, state);
        }