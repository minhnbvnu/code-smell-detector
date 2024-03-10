function isSolelyIdentifierDefinitionLocation(contextToken2) {
                const parent2 = contextToken2.parent;
                const containingNodeKind = parent2.kind;
                switch (contextToken2.kind) {
                    case 27 /* CommaToken */:
                        return containingNodeKind === 257 /* VariableDeclaration */ || isVariableDeclarationListButNotTypeArgument(contextToken2) || containingNodeKind === 240 /* VariableStatement */ || containingNodeKind === 263 /* EnumDeclaration */ || // enum a { foo, |
                            isFunctionLikeButNotConstructor(containingNodeKind) || containingNodeKind === 261 /* InterfaceDeclaration */ || // interface A<T, |
                            containingNodeKind === 204 /* ArrayBindingPattern */ || // var [x, y|
                            containingNodeKind === 262 /* TypeAliasDeclaration */ || // type Map, K, |
                            // class A<T, |
                            // var C = class D<T, |
                            isClassLike(parent2) && !!parent2.typeParameters && parent2.typeParameters.end >= contextToken2.pos;
                    case 24 /* DotToken */:
                        return containingNodeKind === 204 /* ArrayBindingPattern */;
                    case 58 /* ColonToken */:
                        return containingNodeKind === 205 /* BindingElement */;
                    case 22 /* OpenBracketToken */:
                        return containingNodeKind === 204 /* ArrayBindingPattern */;
                    case 20 /* OpenParenToken */:
                        return containingNodeKind === 295 /* CatchClause */ || isFunctionLikeButNotConstructor(containingNodeKind);
                    case 18 /* OpenBraceToken */:
                        return containingNodeKind === 263 /* EnumDeclaration */;
                    case 29 /* LessThanToken */:
                        return containingNodeKind === 260 /* ClassDeclaration */ || // class A< |
                            containingNodeKind === 228 /* ClassExpression */ || // var C = class D< |
                            containingNodeKind === 261 /* InterfaceDeclaration */ || // interface A< |
                            containingNodeKind === 262 /* TypeAliasDeclaration */ || // type List< |
                            isFunctionLikeKind(containingNodeKind);
                    case 124 /* StaticKeyword */:
                        return containingNodeKind === 169 /* PropertyDeclaration */ && !isClassLike(parent2.parent);
                    case 25 /* DotDotDotToken */:
                        return containingNodeKind === 166 /* Parameter */ || !!parent2.parent && parent2.parent.kind === 204 /* ArrayBindingPattern */;
                    case 123 /* PublicKeyword */:
                    case 121 /* PrivateKeyword */:
                    case 122 /* ProtectedKeyword */:
                        return containingNodeKind === 166 /* Parameter */ && !isConstructorDeclaration(parent2.parent);
                    case 128 /* AsKeyword */:
                        return containingNodeKind === 273 /* ImportSpecifier */ || containingNodeKind === 278 /* ExportSpecifier */ || containingNodeKind === 271 /* NamespaceImport */;
                    case 137 /* GetKeyword */:
                    case 151 /* SetKeyword */:
                        return !isFromObjectTypeDeclaration(contextToken2);
                    case 79 /* Identifier */:
                        if (containingNodeKind === 273 /* ImportSpecifier */ && contextToken2 === parent2.name && contextToken2.text === "type") {
                            return false;
                        }
                        break;
                    case 84 /* ClassKeyword */:
                    case 92 /* EnumKeyword */:
                    case 118 /* InterfaceKeyword */:
                    case 98 /* FunctionKeyword */:
                    case 113 /* VarKeyword */:
                    case 100 /* ImportKeyword */:
                    case 119 /* LetKeyword */:
                    case 85 /* ConstKeyword */:
                    case 138 /* InferKeyword */:
                        return true;
                    case 154 /* TypeKeyword */:
                        return containingNodeKind !== 273 /* ImportSpecifier */;
                    case 41 /* AsteriskToken */:
                        return isFunctionLike(contextToken2.parent) && !isMethodDeclaration(contextToken2.parent);
                }
                if (isClassMemberCompletionKeyword(keywordForNode(contextToken2)) && isFromObjectTypeDeclaration(contextToken2)) {
                    return false;
                }
                if (isConstructorParameterCompletion(contextToken2)) {
                    if (!isIdentifier(contextToken2) || isParameterPropertyModifier(keywordForNode(contextToken2)) || isCurrentlyEditingNode(contextToken2)) {
                        return false;
                    }
                }
                switch (keywordForNode(contextToken2)) {
                    case 126 /* AbstractKeyword */:
                    case 84 /* ClassKeyword */:
                    case 85 /* ConstKeyword */:
                    case 136 /* DeclareKeyword */:
                    case 92 /* EnumKeyword */:
                    case 98 /* FunctionKeyword */:
                    case 118 /* InterfaceKeyword */:
                    case 119 /* LetKeyword */:
                    case 121 /* PrivateKeyword */:
                    case 122 /* ProtectedKeyword */:
                    case 123 /* PublicKeyword */:
                    case 124 /* StaticKeyword */:
                    case 113 /* VarKeyword */:
                        return true;
                    case 132 /* AsyncKeyword */:
                        return isPropertyDeclaration(contextToken2.parent);
                }
                const ancestorClassLike = findAncestor(contextToken2.parent, isClassLike);
                if (ancestorClassLike && contextToken2 === previousToken && isPreviousPropertyDeclarationTerminated(contextToken2, position)) {
                    return false;
                }
                const ancestorPropertyDeclaraion = getAncestor(contextToken2.parent, 169 /* PropertyDeclaration */);
                if (ancestorPropertyDeclaraion && contextToken2 !== previousToken && isClassLike(previousToken.parent.parent) && position <= previousToken.end) {
                    if (isPreviousPropertyDeclarationTerminated(contextToken2, previousToken.end)) {
                        return false;
                    }
                    else if (contextToken2.kind !== 63 /* EqualsToken */ && (isInitializedProperty(ancestorPropertyDeclaraion) || hasType(ancestorPropertyDeclaraion))) {
                        return true;
                    }
                }
                return isDeclarationName(contextToken2) && !isShorthandPropertyAssignment(contextToken2.parent) && !isJsxAttribute(contextToken2.parent) && !(isClassLike(contextToken2.parent) && (contextToken2 !== previousToken || position > previousToken.end));
            }