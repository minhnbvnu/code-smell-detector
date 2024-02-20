function doChange11(changes, sourceFile, constructor, superCall) {
            changes.insertNodeAtConstructorStart(sourceFile, constructor, superCall);
            changes.delete(sourceFile, superCall);
        }