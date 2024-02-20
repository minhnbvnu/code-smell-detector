function isInReferenceComment(sourceFile, position) {
            return isInReferenceCommentWorker(sourceFile, position, 
            /*shouldBeReference*/
            true);
        }