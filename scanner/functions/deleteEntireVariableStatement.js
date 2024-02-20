function deleteEntireVariableStatement(changes, sourceFile, node) {
            changes.delete(sourceFile, node.parent.kind === 240 /* VariableStatement */ ? node.parent : node);
        }