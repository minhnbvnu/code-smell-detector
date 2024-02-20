function isIdentifierName(node) {
            const parent2 = node.parent;
            switch (parent2.kind) {
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 302 /* EnumMember */:
                case 299 /* PropertyAssignment */:
                case 208 /* PropertyAccessExpression */:
                    return parent2.name === node;
                case 163 /* QualifiedName */:
                    return parent2.right === node;
                case 205 /* BindingElement */:
                case 273 /* ImportSpecifier */:
                    return parent2.propertyName === node;
                case 278 /* ExportSpecifier */:
                case 288 /* JsxAttribute */:
                case 282 /* JsxSelfClosingElement */:
                case 283 /* JsxOpeningElement */:
                case 284 /* JsxClosingElement */:
                    return true;
            }
            return false;
        }