function getTrailingCommentRanges(text, pos) {
            return reduceEachTrailingCommentRange(text, pos, appendCommentRange, 
            /*state*/
            void 0, 
            /*initial*/
            void 0);
        }