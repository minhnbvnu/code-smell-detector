function getNavigationBarItems(sourceFile, cancellationToken) {
            curCancellationToken = cancellationToken;
            curSourceFile = sourceFile;
            try {
                return map(primaryNavBarMenuItems(rootNavigationBarNode(sourceFile)), convertToPrimaryNavBarMenuItem);
            }
            finally {
                reset();
            }
        }