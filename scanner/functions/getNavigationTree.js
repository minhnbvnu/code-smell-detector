function getNavigationTree(sourceFile, cancellationToken) {
            curCancellationToken = cancellationToken;
            curSourceFile = sourceFile;
            try {
                return convertToTree(rootNavigationBarNode(sourceFile));
            }
            finally {
                reset();
            }
        }