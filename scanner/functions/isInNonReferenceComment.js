function isInNonReferenceComment(sourceFile, position) {
            return isInReferenceCommentWorker(sourceFile, position, 
            /*shouldBeReference*/
            false);
        }