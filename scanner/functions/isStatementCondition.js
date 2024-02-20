function isStatementCondition(node) {
                const parent3 = node.parent;
                switch (parent3.kind) {
                    case 242 /* IfStatement */:
                    case 244 /* WhileStatement */:
                    case 243 /* DoStatement */:
                        return parent3.expression === node;
                    case 245 /* ForStatement */:
                    case 224 /* ConditionalExpression */:
                        return parent3.condition === node;
                }
                return false;
            }