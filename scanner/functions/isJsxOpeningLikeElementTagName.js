function isJsxOpeningLikeElementTagName(node, includeElementAccess = false, skipPastOuterExpressions = false) {
            return isCalleeWorker(node, isJsxOpeningLikeElement, selectTagNameOfJsxOpeningLikeElement, includeElementAccess, skipPastOuterExpressions);
        }