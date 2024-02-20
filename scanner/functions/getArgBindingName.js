function getArgBindingName(funcNode, transformer) {
            const types = [];
            let name;
            if (isFunctionLikeDeclaration(funcNode)) {
                if (funcNode.parameters.length > 0) {
                    const param = funcNode.parameters[0].name;
                    name = getMappedBindingNameOrDefault(param);
                }
            }
            else if (isIdentifier(funcNode)) {
                name = getMapEntryOrDefault(funcNode);
            }
            else if (isPropertyAccessExpression(funcNode) && isIdentifier(funcNode.name)) {
                name = getMapEntryOrDefault(funcNode.name);
            }
            if (!name || "identifier" in name && name.identifier.text === "undefined") {
                return void 0;
            }
            return name;
            function getMappedBindingNameOrDefault(bindingName) {
                if (isIdentifier(bindingName))
                    return getMapEntryOrDefault(bindingName);
                const elements = flatMap(bindingName.elements, (element) => {
                    if (isOmittedExpression(element))
                        return [];
                    return [getMappedBindingNameOrDefault(element.name)];
                });
                return createSynthBindingPattern(bindingName, elements);
            }
            function getMapEntryOrDefault(identifier) {
                const originalNode = getOriginalNode2(identifier);
                const symbol = getSymbol2(originalNode);
                if (!symbol) {
                    return createSynthIdentifier(identifier, types);
                }
                const mapEntry = transformer.synthNamesMap.get(getSymbolId(symbol).toString());
                return mapEntry || createSynthIdentifier(identifier, types);
            }
            function getSymbol2(node) {
                var _a2, _b;
                return (_b = (_a2 = tryCast(node, canHaveSymbol)) == null ? void 0 : _a2.symbol) != null ? _b : transformer.checker.getSymbolAtLocation(node);
            }
            function getOriginalNode2(node) {
                return node.original ? node.original : node;
            }
        }