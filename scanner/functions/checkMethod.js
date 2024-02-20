function checkMethod(symbol, ignoreStatic) {
        var _a, _b;
        const { valueDeclaration } = symbol;
        if (!valueDeclaration) {
            // working around https://github.com/microsoft/TypeScript/issues/31294
            return { dangerous: false };
        }
        switch (valueDeclaration.kind) {
            case ts.SyntaxKind.PropertyDeclaration:
                return {
                    dangerous: ((_a = valueDeclaration.initializer) === null || _a === void 0 ? void 0 : _a.kind) ===
                        ts.SyntaxKind.FunctionExpression,
                };
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature: {
                const decl = valueDeclaration;
                const firstParam = decl.parameters[0];
                const firstParamIsThis = (firstParam === null || firstParam === void 0 ? void 0 : firstParam.name.kind) === ts.SyntaxKind.Identifier &&
                    (firstParam === null || firstParam === void 0 ? void 0 : firstParam.name.escapedText) === 'this';
                const thisArgIsVoid = firstParamIsThis &&
                    ((_b = firstParam === null || firstParam === void 0 ? void 0 : firstParam.type) === null || _b === void 0 ? void 0 : _b.kind) === ts.SyntaxKind.VoidKeyword;
                return {
                    dangerous: !thisArgIsVoid &&
                        !(ignoreStatic &&
                            tsutils.hasModifier((0, util_1.getModifiers)(valueDeclaration), ts.SyntaxKind.StaticKeyword)),
                    firstParamIsThis,
                };
            }
        }
        return { dangerous: false };
    }