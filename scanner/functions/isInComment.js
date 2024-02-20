function isInComment(sourceFile, position, tokenAtPosition) {
            return ts_formatting_exports.getRangeOfEnclosingComment(sourceFile, position, 
            /*precedingToken*/
            void 0, tokenAtPosition);
        }