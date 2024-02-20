function addJsxAttributes(changes, context, info) {
            const importAdder = createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
            const quotePreference = getQuotePreference(context.sourceFile, context.preferences);
            const checker = context.program.getTypeChecker();
            const jsxAttributesNode = info.parentDeclaration.attributes;
            const hasSpreadAttribute = some(jsxAttributesNode.properties, isJsxSpreadAttribute);
            const attrs = map(info.attributes, (attr) => {
                const value = tryGetValueFromType(context, checker, importAdder, quotePreference, checker.getTypeOfSymbol(attr), info.parentDeclaration);
                const name = factory.createIdentifier(attr.name);
                const jsxAttribute = factory.createJsxAttribute(name, factory.createJsxExpression(
                /*dotDotDotToken*/
                void 0, value));
                setParent(name, jsxAttribute);
                return jsxAttribute;
            });
            const jsxAttributes = factory.createJsxAttributes(hasSpreadAttribute ? [...attrs, ...jsxAttributesNode.properties] : [...jsxAttributesNode.properties, ...attrs]);
            const options = { prefix: jsxAttributesNode.pos === jsxAttributesNode.end ? " " : void 0 };
            changes.replaceNode(context.sourceFile, jsxAttributesNode, jsxAttributes, options);
            importAdder.writeFixes(changes);
        }