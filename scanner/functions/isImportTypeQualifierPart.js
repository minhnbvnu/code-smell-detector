function isImportTypeQualifierPart(node) {
                let parent2 = node.parent;
                while (isQualifiedName(parent2)) {
                    node = parent2;
                    parent2 = parent2.parent;
                }
                if (parent2 && parent2.kind === 202 /* ImportType */ && parent2.qualifier === node) {
                    return parent2;
                }
                return void 0;
            }