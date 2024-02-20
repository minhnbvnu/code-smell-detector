function convertExportsAccesses(sourceFile, exports, changes) {
            forEachExportReference(sourceFile, (node, isAssignmentLhs) => {
                if (isAssignmentLhs) {
                    return;
                }
                const { text } = node.name;
                changes.replaceNode(sourceFile, node, factory.createIdentifier(exports.get(text) || text));
            });
        }