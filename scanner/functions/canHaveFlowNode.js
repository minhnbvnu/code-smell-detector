function canHaveFlowNode(node) {
            if (node.kind >= 240 /* FirstStatement */ && node.kind <= 256 /* LastStatement */) {
                return true;
            }
            switch (node.kind) {
                case 79 /* Identifier */:
                case 108 /* ThisKeyword */:
                case 106 /* SuperKeyword */:
                case 163 /* QualifiedName */:
                case 233 /* MetaProperty */:
                case 209 /* ElementAccessExpression */:
                case 208 /* PropertyAccessExpression */:
                case 205 /* BindingElement */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    return true;
                default:
                    return false;
            }
        }