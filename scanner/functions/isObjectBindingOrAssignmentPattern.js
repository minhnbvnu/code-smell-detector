function isObjectBindingOrAssignmentPattern(node) {
            switch (node.kind) {
                case 203 /* ObjectBindingPattern */:
                case 207 /* ObjectLiteralExpression */:
                    return true;
            }
            return false;
        }