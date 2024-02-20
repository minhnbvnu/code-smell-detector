function isArrayBindingOrAssignmentPattern(node) {
            switch (node.kind) {
                case 204 /* ArrayBindingPattern */:
                case 206 /* ArrayLiteralExpression */:
                    return true;
            }
            return false;
        }