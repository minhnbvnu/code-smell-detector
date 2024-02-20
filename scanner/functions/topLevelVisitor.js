function topLevelVisitor(node) {
                switch (node.kind) {
                    case 269 /* ImportDeclaration */:
                        return visitImportDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return visitImportEqualsDeclaration(node);
                    case 275 /* ExportDeclaration */:
                        return visitExportDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return visitExportAssignment(node);
                    default:
                        return topLevelNestedVisitor(node);
                }
            }