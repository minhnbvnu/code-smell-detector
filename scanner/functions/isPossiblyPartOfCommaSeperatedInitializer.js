function isPossiblyPartOfCommaSeperatedInitializer(node) {
            switch (node.kind) {
                case 79 /* Identifier */:
                case 223 /* BinaryExpression */:
                case 27 /* CommaToken */:
                    return true;
                default:
                    return false;
            }
        }