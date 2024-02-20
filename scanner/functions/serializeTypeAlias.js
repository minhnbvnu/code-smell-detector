function serializeTypeAlias(symbol, symbolName2, modifierFlags) {
                        var _a2;
                        const aliasType = getDeclaredTypeOfTypeAlias(symbol);
                        const typeParams = getSymbolLinks(symbol).typeParameters;
                        const typeParamDecls = map(typeParams, (p) => typeParameterToDeclaration(p, context));
                        const jsdocAliasDecl = (_a2 = symbol.declarations) == null ? void 0 : _a2.find(isJSDocTypeAlias);
                        const commentText = getTextOfJSDocComment(jsdocAliasDecl ? jsdocAliasDecl.comment || jsdocAliasDecl.parent.comment : void 0);
                        const oldFlags = context.flags;
                        context.flags |= 8388608 /* InTypeAlias */;
                        const oldEnclosingDecl = context.enclosingDeclaration;
                        context.enclosingDeclaration = jsdocAliasDecl;
                        const typeNode = jsdocAliasDecl && jsdocAliasDecl.typeExpression && isJSDocTypeExpression(jsdocAliasDecl.typeExpression) && serializeExistingTypeNode(context, jsdocAliasDecl.typeExpression.type, includePrivateSymbol, bundled) || typeToTypeNodeHelper(aliasType, context);
                        addResult(setSyntheticLeadingComments(factory.createTypeAliasDeclaration(
                        /*modifiers*/
                        void 0, getInternalSymbolName(symbol, symbolName2), typeParamDecls, typeNode), !commentText ? [] : [{ kind: 3 /* MultiLineCommentTrivia */, text: "*\n * " + commentText.replace(/\n/g, "\n * ") + "\n ", pos: -1, end: -1, hasTrailingNewLine: true }]), modifierFlags);
                        context.flags = oldFlags;
                        context.enclosingDeclaration = oldEnclosingDecl;
                    }