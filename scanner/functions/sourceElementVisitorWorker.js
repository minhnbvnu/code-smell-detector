function sourceElementVisitorWorker(node) {
                switch (node.kind) {
                    case 269 /* ImportDeclaration */:
                    case 268 /* ImportEqualsDeclaration */:
                    case 274 /* ExportAssignment */:
                    case 275 /* ExportDeclaration */:
                        return visitElidableStatement(node);
                    default:
                        return visitorWorker(node);
                }
            }