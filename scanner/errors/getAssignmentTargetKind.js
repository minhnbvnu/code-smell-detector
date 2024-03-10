function getAssignmentTargetKind(node) {
            let parent2 = node.parent;
            while (true) {
                switch (parent2.kind) {
                    case 223 /* BinaryExpression */:
                        const binaryOperator = parent2.operatorToken.kind;
                        return isAssignmentOperator(binaryOperator) && parent2.left === node ? binaryOperator === 63 /* EqualsToken */ || isLogicalOrCoalescingAssignmentOperator(binaryOperator) ? 1 /* Definite */ : 2 /* Compound */ : 0 /* None */;
                    case 221 /* PrefixUnaryExpression */:
                    case 222 /* PostfixUnaryExpression */:
                        const unaryOperator = parent2.operator;
                        return unaryOperator === 45 /* PlusPlusToken */ || unaryOperator === 46 /* MinusMinusToken */ ? 2 /* Compound */ : 0 /* None */;
                    case 246 /* ForInStatement */:
                    case 247 /* ForOfStatement */:
                        return parent2.initializer === node ? 1 /* Definite */ : 0 /* None */;
                    case 214 /* ParenthesizedExpression */:
                    case 206 /* ArrayLiteralExpression */:
                    case 227 /* SpreadElement */:
                    case 232 /* NonNullExpression */:
                        node = parent2;
                        break;
                    case 301 /* SpreadAssignment */:
                        node = parent2.parent;
                        break;
                    case 300 /* ShorthandPropertyAssignment */:
                        if (parent2.name !== node) {
                            return 0 /* None */;
                        }
                        node = parent2.parent;
                        break;
                    case 299 /* PropertyAssignment */:
                        if (parent2.name === node) {
                            return 0 /* None */;
                        }
                        node = parent2.parent;
                        break;
                    default:
                        return 0 /* None */;
                }
                parent2 = node.parent;
            }
        }