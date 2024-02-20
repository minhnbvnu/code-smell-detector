function visitElidableStatement(node) {
                const parsed = getParseTreeNode(node);
                if (parsed !== node) {
                    if (node.transformFlags & 1 /* ContainsTypeScript */) {
                        return visitEachChild(node, visitor, context);
                    }
                    return node;
                }
                switch (node.kind) {
                    case 269 /* ImportDeclaration */:
                        return visitImportDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return visitImportEqualsDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return visitExportAssignment(node);
                    case 275 /* ExportDeclaration */:
                        return visitExportDeclaration(node);
                    default:
                        Debug.fail("Unhandled ellided statement");
                }
            }