function getVariableLikeInitializer(declaration) {
            switch (declaration.kind) {
                case 257 /* VariableDeclaration */:
                case 166 /* Parameter */:
                case 205 /* BindingElement */:
                case 169 /* PropertyDeclaration */:
                case 299 /* PropertyAssignment */:
                    return declaration.initializer;
                case 288 /* JsxAttribute */:
                    return declaration.initializer && (isJsxExpression(declaration.initializer) ? declaration.initializer.expression : void 0);
                case 300 /* ShorthandPropertyAssignment */:
                case 168 /* PropertySignature */:
                case 302 /* EnumMember */:
                case 351 /* JSDocPropertyTag */:
                case 344 /* JSDocParameterTag */:
                    return void 0;
            }
        }