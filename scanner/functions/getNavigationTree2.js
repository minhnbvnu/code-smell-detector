function getNavigationTree2(fileName) {
                return getNavigationTree(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
            }