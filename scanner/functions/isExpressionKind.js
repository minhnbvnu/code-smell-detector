function isExpressionKind(kind) {
            switch (kind) {
                case 224 /* ConditionalExpression */:
                case 226 /* YieldExpression */:
                case 216 /* ArrowFunction */:
                case 223 /* BinaryExpression */:
                case 227 /* SpreadElement */:
                case 231 /* AsExpression */:
                case 229 /* OmittedExpression */:
                case 357 /* CommaListExpression */:
                case 356 /* PartiallyEmittedExpression */:
                case 235 /* SatisfiesExpression */:
                    return true;
                default:
                    return isUnaryExpressionKind(kind);
            }
        }