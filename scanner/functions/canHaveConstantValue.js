function canHaveConstantValue(node) {
                switch (node.kind) {
                    case 302 /* EnumMember */:
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        return true;
                }
                return false;
            }