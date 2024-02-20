function getLeadingCommentRanges(text, pos) {
            return reduceEachLeadingCommentRange(text, pos, appendCommentRange, 
            /*state*/
            void 0, 
            /*initial*/
            void 0);
        }