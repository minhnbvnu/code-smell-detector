function getCallHierarchyItemName(program, node) {
            if (isSourceFile(node)) {
                return { text: node.fileName, pos: 0, end: 0 };
            }
            if ((isFunctionDeclaration(node) || isClassDeclaration(node)) && !isNamedDeclaration(node)) {
                const defaultModifier = node.modifiers && find(node.modifiers, isDefaultModifier3);
                if (defaultModifier) {
                    return { text: "default", pos: defaultModifier.getStart(), end: defaultModifier.getEnd() };
                }
            }
            if (isClassStaticBlockDeclaration(node)) {
                const sourceFile = node.getSourceFile();
                const pos = skipTrivia(sourceFile.text, moveRangePastModifiers(node).pos);
                const end = pos + 6;
                const typeChecker = program.getTypeChecker();
                const symbol = typeChecker.getSymbolAtLocation(node.parent);
                const prefix = symbol ? `${typeChecker.symbolToString(symbol, node.parent)} ` : "";
                return { text: `${prefix}static {}`, pos, end };
            }
            const declName = isConstNamedExpression(node) ? node.parent.name : Debug.checkDefined(getNameOfDeclaration(node), "Expected call hierarchy item to have a name");
            let text = isIdentifier(declName) ? idText(declName) : isStringOrNumericLiteralLike(declName) ? declName.text : isComputedPropertyName(declName) ? isStringOrNumericLiteralLike(declName.expression) ? declName.expression.text : void 0 : void 0;
            if (text === void 0) {
                const typeChecker = program.getTypeChecker();
                const symbol = typeChecker.getSymbolAtLocation(declName);
                if (symbol) {
                    text = typeChecker.symbolToString(symbol, node);
                }
            }
            if (text === void 0) {
                const printer = createPrinterWithRemoveCommentsOmitTrailingSemicolon();
                text = usingSingleLineStringWriter((writer) => printer.writeNode(4 /* Unspecified */, node, node.getSourceFile(), writer));
            }
            return { text, pos: declName.getStart(), end: declName.getEnd() };
        }