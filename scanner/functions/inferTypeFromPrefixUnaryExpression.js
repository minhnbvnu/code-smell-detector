function inferTypeFromPrefixUnaryExpression(node, usage) {
                switch (node.operator) {
                    case 45 /* PlusPlusToken */:
                    case 46 /* MinusMinusToken */:
                    case 40 /* MinusToken */:
                    case 54 /* TildeToken */:
                        usage.isNumber = true;
                        break;
                    case 39 /* PlusToken */:
                        usage.isNumberOrString = true;
                        break;
                }
            }