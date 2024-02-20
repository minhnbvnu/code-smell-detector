function isQualifiedNameNamespaceReference(node) {
            let root = node;
            let isLastClause = true;
            if (root.parent.kind === 163 /* QualifiedName */) {
                while (root.parent && root.parent.kind === 163 /* QualifiedName */) {
                    root = root.parent;
                }
                isLastClause = root.right === node;
            }
            return root.parent.kind === 180 /* TypeReference */ && !isLastClause;
        }