function namedEvaluationVisitor(node, referencedName) {
                switch (node.kind) {
                    case 356 /* PartiallyEmittedExpression */:
                        return visitPartiallyEmittedExpression(node, 
                        /*discarded*/
                        false, referencedName);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, 
                        /*discarded*/
                        false, referencedName);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node, referencedName);
                    default:
                        return visitor(node);
                }
            }