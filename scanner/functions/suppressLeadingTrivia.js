function suppressLeadingTrivia(node) {
            addEmitFlagsRecursively(node, 1024 /* NoLeadingComments */, getFirstChild);
        }