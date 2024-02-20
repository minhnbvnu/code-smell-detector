function findChildOfKind(n, kind, sourceFile) {
            return find(n.getChildren(sourceFile), (c) => c.kind === kind);
        }