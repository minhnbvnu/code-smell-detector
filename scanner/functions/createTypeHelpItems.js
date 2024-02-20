function createTypeHelpItems(symbol, { argumentCount, argumentsSpan: applicableSpan, invocation, argumentIndex }, sourceFile, checker) {
            const typeParameters = checker.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
            if (!typeParameters)
                return void 0;
            const items = [getTypeHelpItem(symbol, typeParameters, checker, getEnclosingDeclarationFromInvocation(invocation), sourceFile)];
            return { items, applicableSpan, selectedItemIndex: 0, argumentIndex, argumentCount };
        }