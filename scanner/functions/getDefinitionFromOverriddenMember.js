function getDefinitionFromOverriddenMember(typeChecker, node) {
            const classElement = findAncestor(node, isClassElement);
            if (!(classElement && classElement.name))
                return;
            const baseDeclaration = findAncestor(classElement, isClassLike);
            if (!baseDeclaration)
                return;
            const baseTypeNode = getEffectiveBaseTypeNode(baseDeclaration);
            if (!baseTypeNode)
                return;
            const expression = skipParentheses(baseTypeNode.expression);
            const base = isClassExpression(expression) ? expression.symbol : typeChecker.getSymbolAtLocation(expression);
            if (!base)
                return;
            const name = unescapeLeadingUnderscores(getTextOfPropertyName(classElement.name));
            const symbol = hasStaticModifier(classElement) ? typeChecker.getPropertyOfType(typeChecker.getTypeOfSymbol(base), name) : typeChecker.getPropertyOfType(typeChecker.getDeclaredTypeOfSymbol(base), name);
            if (!symbol)
                return;
            return getDefinitionFromSymbol(typeChecker, symbol, node);
        }