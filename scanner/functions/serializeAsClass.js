function serializeAsClass(symbol, localName, modifierFlags) {
                        var _a2, _b;
                        const originalDecl = (_a2 = symbol.declarations) == null ? void 0 : _a2.find(isClassLike);
                        const oldEnclosing = context.enclosingDeclaration;
                        context.enclosingDeclaration = originalDecl || oldEnclosing;
                        const localParams = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                        const typeParamDecls = map(localParams, (p) => typeParameterToDeclaration(p, context));
                        const classType = getDeclaredTypeOfClassOrInterface(symbol);
                        const baseTypes = getBaseTypes(classType);
                        const originalImplements = originalDecl && getEffectiveImplementsTypeNodes(originalDecl);
                        const implementsExpressions = originalImplements && sanitizeJSDocImplements(originalImplements) || mapDefined(getImplementsTypes(classType), serializeImplementedType);
                        const staticType = getTypeOfSymbol(symbol);
                        const isClass = !!((_b = staticType.symbol) == null ? void 0 : _b.valueDeclaration) && isClassLike(staticType.symbol.valueDeclaration);
                        const staticBaseType = isClass ? getBaseConstructorTypeOfClass(staticType) : anyType;
                        const heritageClauses = [
                            ...!length(baseTypes) ? [] : [factory.createHeritageClause(94 /* ExtendsKeyword */, map(baseTypes, (b) => serializeBaseType(b, staticBaseType, localName)))],
                            ...!length(implementsExpressions) ? [] : [factory.createHeritageClause(117 /* ImplementsKeyword */, implementsExpressions)]
                        ];
                        const symbolProps = getNonInheritedProperties(classType, baseTypes, getPropertiesOfType(classType));
                        const publicSymbolProps = filter(symbolProps, (s) => {
                            const valueDecl = s.valueDeclaration;
                            return !!valueDecl && !(isNamedDeclaration(valueDecl) && isPrivateIdentifier(valueDecl.name));
                        });
                        const hasPrivateIdentifier = some(symbolProps, (s) => {
                            const valueDecl = s.valueDeclaration;
                            return !!valueDecl && isNamedDeclaration(valueDecl) && isPrivateIdentifier(valueDecl.name);
                        });
                        const privateProperties = hasPrivateIdentifier ? [factory.createPropertyDeclaration(
                            /*modifiers*/
                            void 0, factory.createPrivateIdentifier("#private"), 
                            /*questionOrExclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, 
                            /*initializer*/
                            void 0)] : emptyArray;
                        const publicProperties = flatMap(publicSymbolProps, (p) => serializePropertySymbolForClass(p, 
                        /*isStatic*/
                        false, baseTypes[0]));
                        const staticMembers = flatMap(filter(getPropertiesOfType(staticType), (p) => !(p.flags & 4194304 /* Prototype */) && p.escapedName !== "prototype" && !isNamespaceMember(p)), (p) => serializePropertySymbolForClass(p, 
                        /*isStatic*/
                        true, staticBaseType));
                        const isNonConstructableClassLikeInJsFile = !isClass && !!symbol.valueDeclaration && isInJSFile(symbol.valueDeclaration) && !some(getSignaturesOfType(staticType, 1 /* Construct */));
                        const constructors = isNonConstructableClassLikeInJsFile ? [factory.createConstructorDeclaration(factory.createModifiersFromModifierFlags(8 /* Private */), [], 
                            /*body*/
                            void 0)] : serializeSignatures(1 /* Construct */, staticType, staticBaseType, 173 /* Constructor */);
                        const indexSignatures = serializeIndexSignatures(classType, baseTypes[0]);
                        context.enclosingDeclaration = oldEnclosing;
                        addResult(setTextRange(factory.createClassDeclaration(
                        /*modifiers*/
                        void 0, localName, typeParamDecls, heritageClauses, [...indexSignatures, ...staticMembers, ...constructors, ...publicProperties, ...privateProperties]), symbol.declarations && filter(symbol.declarations, (d) => isClassDeclaration(d) || isClassExpression(d))[0]), modifierFlags);
                    }