function getNavigationBarItems2(fileName) {
                return getNavigationBarItems(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
            }