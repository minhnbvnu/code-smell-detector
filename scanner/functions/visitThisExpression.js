function visitThisExpression(node) {
                return classThis != null ? classThis : node;
            }