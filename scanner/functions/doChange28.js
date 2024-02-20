function doChange28(changes, sourceFile, importType) {
            const newTypeNode = factory.updateImportTypeNode(importType, importType.argument, importType.assertions, importType.qualifier, importType.typeArguments, 
            /* isTypeOf */
            true);
            changes.replaceNode(sourceFile, importType, newTypeNode);
        }