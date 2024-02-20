function isArrayBindingOrAssignmentElement(node) {
            switch (node.kind) {
                case 205 /* BindingElement */:
                case 229 /* OmittedExpression */:
                case 227 /* SpreadElement */:
                case 206 /* ArrayLiteralExpression */:
                case 207 /* ObjectLiteralExpression */:
                case 79 /* Identifier */:
                case 208 /* PropertyAccessExpression */:
                case 209 /* ElementAccessExpression */:
                    return true;
            }
            return isAssignmentExpression(node, 
            /*excludeCompoundAssignment*/
            true);
        }