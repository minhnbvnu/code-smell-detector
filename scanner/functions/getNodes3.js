function getNodes3(sourceFile, start) {
            const token = getTokenAtPosition(sourceFile, start);
            const containingFunction = getContainingFunction(token);
            if (!containingFunction) {
                return;
            }
            let insertBefore;
            switch (containingFunction.kind) {
                case 171 /* MethodDeclaration */:
                    insertBefore = containingFunction.name;
                    break;
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                    insertBefore = findChildOfKind(containingFunction, 98 /* FunctionKeyword */, sourceFile);
                    break;
                case 216 /* ArrowFunction */:
                    const kind = containingFunction.typeParameters ? 29 /* LessThanToken */ : 20 /* OpenParenToken */;
                    insertBefore = findChildOfKind(containingFunction, kind, sourceFile) || first(containingFunction.parameters);
                    break;
                default:
                    return;
            }
            return insertBefore && {
                insertBefore,
                returnType: getReturnType(containingFunction)
            };
        }