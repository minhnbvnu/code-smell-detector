function updateJSDocHost(parent2) {
            if (parent2.kind !== 216 /* ArrowFunction */) {
                return parent2;
            }
            const jsDocNode = parent2.parent.kind === 169 /* PropertyDeclaration */ ? parent2.parent : parent2.parent.parent;
            jsDocNode.jsDoc = parent2.jsDoc;
            return jsDocNode;
        }