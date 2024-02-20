function getTouchingToken(sourceFile, position, includePrecedingTokenAtEndPosition) {
            return getTokenAtPositionWorker(sourceFile, position, 
            /*allowPositionInLeadingTrivia*/
            false, includePrecedingTokenAtEndPosition, 
            /*includeEndPosition*/
            false);
        }