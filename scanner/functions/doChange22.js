function doChange22(changes, sourceFile, { insertBefore, returnType }) {
            if (returnType) {
                const entityName = getEntityNameFromTypeNode(returnType);
                if (!entityName || entityName.kind !== 79 /* Identifier */ || entityName.text !== "Promise") {
                    changes.replaceNode(sourceFile, returnType, factory.createTypeReferenceNode("Promise", factory.createNodeArray([returnType])));
                }
            }
            changes.insertModifierBefore(sourceFile, 132 /* AsyncKeyword */, insertBefore);
        }