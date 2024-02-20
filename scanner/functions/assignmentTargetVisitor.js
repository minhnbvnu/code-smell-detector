function assignmentTargetVisitor(node) {
                switch (node.kind) {
                    case 207 /* ObjectLiteralExpression */:
                    case 206 /* ArrayLiteralExpression */:
                        return visitAssignmentPattern(node);
                    default:
                        return visitor(node);
                }
            }