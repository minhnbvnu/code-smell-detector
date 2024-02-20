function makeChange11(changes, sourceFile, span, program, seen) {
            const node = getTokenAtPosition(sourceFile, span.start);
            if (!isIdentifier(node) || !isCallExpression(node.parent) || node.parent.expression !== node || node.parent.arguments.length !== 0)
                return;
            const checker = program.getTypeChecker();
            const symbol = checker.getSymbolAtLocation(node);
            const decl = symbol == null ? void 0 : symbol.valueDeclaration;
            if (!decl || !isParameter(decl) || !isNewExpression(decl.parent.parent))
                return;
            if (seen == null ? void 0 : seen.has(decl))
                return;
            seen == null ? void 0 : seen.add(decl);
            const typeArguments = getEffectiveTypeArguments(decl.parent.parent);
            if (some(typeArguments)) {
                const typeArgument = typeArguments[0];
                const needsParens = !isUnionTypeNode(typeArgument) && !isParenthesizedTypeNode(typeArgument) && isParenthesizedTypeNode(factory.createUnionTypeNode([typeArgument, factory.createKeywordTypeNode(114 /* VoidKeyword */)]).types[0]);
                if (needsParens) {
                    changes.insertText(sourceFile, typeArgument.pos, "(");
                }
                changes.insertText(sourceFile, typeArgument.end, needsParens ? ") | void" : " | void");
            }
            else {
                const signature = checker.getResolvedSignature(node.parent);
                const parameter = signature == null ? void 0 : signature.parameters[0];
                const parameterType = parameter && checker.getTypeOfSymbolAtLocation(parameter, decl.parent.parent);
                if (isInJSFile(decl)) {
                    if (!parameterType || parameterType.flags & 3 /* AnyOrUnknown */) {
                        changes.insertText(sourceFile, decl.parent.parent.end, `)`);
                        changes.insertText(sourceFile, skipTrivia(sourceFile.text, decl.parent.parent.pos), `/** @type {Promise<void>} */(`);
                    }
                }
                else {
                    if (!parameterType || parameterType.flags & 2 /* Unknown */) {
                        changes.insertText(sourceFile, decl.parent.parent.expression.end, "<void>");
                    }
                }
            }
        }