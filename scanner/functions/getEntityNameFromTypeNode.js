function getEntityNameFromTypeNode(node) {
            switch (node.kind) {
                case 180 /* TypeReference */:
                    return node.typeName;
                case 230 /* ExpressionWithTypeArguments */:
                    return isEntityNameExpression(node.expression) ? node.expression : void 0;
                case 79 /* Identifier */:
                case 163 /* QualifiedName */:
                    return node;
            }
            return void 0;
        }