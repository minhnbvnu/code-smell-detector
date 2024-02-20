function convertToAssignmentPattern(node) {
                switch (node.kind) {
                    case 204 /* ArrayBindingPattern */:
                    case 206 /* ArrayLiteralExpression */:
                        return convertToArrayAssignmentPattern(node);
                    case 203 /* ObjectBindingPattern */:
                    case 207 /* ObjectLiteralExpression */:
                        return convertToObjectAssignmentPattern(node);
                }
            }