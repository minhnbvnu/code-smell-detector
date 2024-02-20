function startPositionToDeleteNodeInList(sourceFile, node) {
            return skipTrivia(sourceFile.text, getAdjustedStartPosition(sourceFile, node, { leadingTriviaOption: 1 /* IncludeAll */ }), 
            /*stopAfterLineBreak*/
            false, 
            /*stopAtComments*/
            true);
        }