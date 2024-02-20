function getLeftmostExpression(node, stopAtCallExpressions) {
            while (true) {
                switch (node.kind) {
                    case 222 /* PostfixUnaryExpression */:
                        node = node.operand;
                        continue;
                    case 223 /* BinaryExpression */:
                        node = node.left;
                        continue;
                    case 224 /* ConditionalExpression */:
                        node = node.condition;
                        continue;
                    case 212 /* TaggedTemplateExpression */:
                        node = node.tag;
                        continue;
                    case 210 /* CallExpression */:
                        if (stopAtCallExpressions) {
                            return node;
                        }
                    case 231 /* AsExpression */:
                    case 209 /* ElementAccessExpression */:
                    case 208 /* PropertyAccessExpression */:
                    case 232 /* NonNullExpression */:
                    case 356 /* PartiallyEmittedExpression */:
                    case 235 /* SatisfiesExpression */:
                        node = node.expression;
                        continue;
                }
                return node;
            }
        }