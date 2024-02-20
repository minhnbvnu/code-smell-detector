function suppressTrailingTrivia(node) {
            addEmitFlagsRecursively(node, 2048 /* NoTrailingComments */, getLastChild);
        }