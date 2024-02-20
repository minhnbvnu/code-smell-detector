function typeToTypeNodeWorker(type, context) {
                    var _a2, _b;
                    if (cancellationToken && cancellationToken.throwIfCancellationRequested) {
                        cancellationToken.throwIfCancellationRequested();
                    }
                    const inTypeAlias = context.flags & 8388608 /* InTypeAlias */;
                    context.flags &= ~8388608 /* InTypeAlias */;
                    if (!type) {
                        if (!(context.flags & 262144 /* AllowEmptyUnionOrIntersection */)) {
                            context.encounteredError = true;
                            return void 0;
                        }
                        context.approximateLength += 3;
                        return factory.createKeywordTypeNode(131 /* AnyKeyword */);
                    }
                    if (!(context.flags & 536870912 /* NoTypeReduction */)) {
                        type = getReducedType(type);
                    }
                    if (type.flags & 1 /* Any */) {
                        if (type.aliasSymbol) {
                            return factory.createTypeReferenceNode(symbolToEntityNameNode(type.aliasSymbol), mapToTypeNodes(type.aliasTypeArguments, context));
                        }
                        if (type === unresolvedType) {
                            return addSyntheticLeadingComment(factory.createKeywordTypeNode(131 /* AnyKeyword */), 3 /* MultiLineCommentTrivia */, "unresolved");
                        }
                        context.approximateLength += 3;
                        return factory.createKeywordTypeNode(type === intrinsicMarkerType ? 139 /* IntrinsicKeyword */ : 131 /* AnyKeyword */);
                    }
                    if (type.flags & 2 /* Unknown */) {
                        return factory.createKeywordTypeNode(157 /* UnknownKeyword */);
                    }
                    if (type.flags & 4 /* String */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(152 /* StringKeyword */);
                    }
                    if (type.flags & 8 /* Number */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(148 /* NumberKeyword */);
                    }
                    if (type.flags & 64 /* BigInt */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(160 /* BigIntKeyword */);
                    }
                    if (type.flags & 16 /* Boolean */ && !type.aliasSymbol) {
                        context.approximateLength += 7;
                        return factory.createKeywordTypeNode(134 /* BooleanKeyword */);
                    }
                    if (type.flags & 1056 /* EnumLike */) {
                        if (type.symbol.flags & 8 /* EnumMember */) {
                            const parentSymbol = getParentOfSymbol(type.symbol);
                            const parentName = symbolToTypeNode(parentSymbol, context, 788968 /* Type */);
                            if (getDeclaredTypeOfSymbol(parentSymbol) === type) {
                                return parentName;
                            }
                            const memberName = symbolName(type.symbol);
                            if (isIdentifierText(memberName, 0 /* ES3 */)) {
                                return appendReferenceToType(parentName, factory.createTypeReferenceNode(memberName, 
                                /*typeArguments*/
                                void 0));
                            }
                            if (isImportTypeNode(parentName)) {
                                parentName.isTypeOf = true;
                                return factory.createIndexedAccessTypeNode(parentName, factory.createLiteralTypeNode(factory.createStringLiteral(memberName)));
                            }
                            else if (isTypeReferenceNode(parentName)) {
                                return factory.createIndexedAccessTypeNode(factory.createTypeQueryNode(parentName.typeName), factory.createLiteralTypeNode(factory.createStringLiteral(memberName)));
                            }
                            else {
                                return Debug.fail("Unhandled type node kind returned from `symbolToTypeNode`.");
                            }
                        }
                        return symbolToTypeNode(type.symbol, context, 788968 /* Type */);
                    }
                    if (type.flags & 128 /* StringLiteral */) {
                        context.approximateLength += type.value.length + 2;
                        return factory.createLiteralTypeNode(setEmitFlags(factory.createStringLiteral(type.value, !!(context.flags & 268435456 /* UseSingleQuotesForStringLiteralType */)), 33554432 /* NoAsciiEscaping */));
                    }
                    if (type.flags & 256 /* NumberLiteral */) {
                        const value = type.value;
                        context.approximateLength += ("" + value).length;
                        return factory.createLiteralTypeNode(value < 0 ? factory.createPrefixUnaryExpression(40 /* MinusToken */, factory.createNumericLiteral(-value)) : factory.createNumericLiteral(value));
                    }
                    if (type.flags & 2048 /* BigIntLiteral */) {
                        context.approximateLength += pseudoBigIntToString(type.value).length + 1;
                        return factory.createLiteralTypeNode(factory.createBigIntLiteral(type.value));
                    }
                    if (type.flags & 512 /* BooleanLiteral */) {
                        context.approximateLength += type.intrinsicName.length;
                        return factory.createLiteralTypeNode(type.intrinsicName === "true" ? factory.createTrue() : factory.createFalse());
                    }
                    if (type.flags & 8192 /* UniqueESSymbol */) {
                        if (!(context.flags & 1048576 /* AllowUniqueESSymbolType */)) {
                            if (isValueSymbolAccessible(type.symbol, context.enclosingDeclaration)) {
                                context.approximateLength += 6;
                                return symbolToTypeNode(type.symbol, context, 111551 /* Value */);
                            }
                            if (context.tracker.reportInaccessibleUniqueSymbolError) {
                                context.tracker.reportInaccessibleUniqueSymbolError();
                            }
                        }
                        context.approximateLength += 13;
                        return factory.createTypeOperatorNode(156 /* UniqueKeyword */, factory.createKeywordTypeNode(153 /* SymbolKeyword */));
                    }
                    if (type.flags & 16384 /* Void */) {
                        context.approximateLength += 4;
                        return factory.createKeywordTypeNode(114 /* VoidKeyword */);
                    }
                    if (type.flags & 32768 /* Undefined */) {
                        context.approximateLength += 9;
                        return factory.createKeywordTypeNode(155 /* UndefinedKeyword */);
                    }
                    if (type.flags & 65536 /* Null */) {
                        context.approximateLength += 4;
                        return factory.createLiteralTypeNode(factory.createNull());
                    }
                    if (type.flags & 131072 /* Never */) {
                        context.approximateLength += 5;
                        return factory.createKeywordTypeNode(144 /* NeverKeyword */);
                    }
                    if (type.flags & 4096 /* ESSymbol */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(153 /* SymbolKeyword */);
                    }
                    if (type.flags & 67108864 /* NonPrimitive */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(149 /* ObjectKeyword */);
                    }
                    if (isThisTypeParameter(type)) {
                        if (context.flags & 4194304 /* InObjectTypeLiteral */) {
                            if (!context.encounteredError && !(context.flags & 32768 /* AllowThisInObjectLiteral */)) {
                                context.encounteredError = true;
                            }
                            (_b = (_a2 = context.tracker).reportInaccessibleThisError) == null ? void 0 : _b.call(_a2);
                        }
                        context.approximateLength += 4;
                        return factory.createThisTypeNode();
                    }
                    if (!inTypeAlias && type.aliasSymbol && (context.flags & 16384 /* UseAliasDefinedOutsideCurrentScope */ || isTypeSymbolAccessible(type.aliasSymbol, context.enclosingDeclaration))) {
                        const typeArgumentNodes = mapToTypeNodes(type.aliasTypeArguments, context);
                        if (isReservedMemberName(type.aliasSymbol.escapedName) && !(type.aliasSymbol.flags & 32 /* Class */))
                            return factory.createTypeReferenceNode(factory.createIdentifier(""), typeArgumentNodes);
                        if (length(typeArgumentNodes) === 1 && type.aliasSymbol === globalArrayType.symbol) {
                            return factory.createArrayTypeNode(typeArgumentNodes[0]);
                        }
                        return symbolToTypeNode(type.aliasSymbol, context, 788968 /* Type */, typeArgumentNodes);
                    }
                    const objectFlags = getObjectFlags(type);
                    if (objectFlags & 4 /* Reference */) {
                        Debug.assert(!!(type.flags & 524288 /* Object */));
                        return type.node ? visitAndTransformType(type, typeReferenceToTypeNode) : typeReferenceToTypeNode(type);
                    }
                    if (type.flags & 262144 /* TypeParameter */ || objectFlags & 3 /* ClassOrInterface */) {
                        if (type.flags & 262144 /* TypeParameter */ && contains(context.inferTypeParameters, type)) {
                            context.approximateLength += symbolName(type.symbol).length + 6;
                            let constraintNode;
                            const constraint = getConstraintOfTypeParameter(type);
                            if (constraint) {
                                const inferredConstraint = getInferredTypeParameterConstraint(type, 
                                /*omitTypeReferences*/
                                true);
                                if (!(inferredConstraint && isTypeIdenticalTo(constraint, inferredConstraint))) {
                                    context.approximateLength += 9;
                                    constraintNode = constraint && typeToTypeNodeHelper(constraint, context);
                                }
                            }
                            return factory.createInferTypeNode(typeParameterToDeclarationWithConstraint(type, context, constraintNode));
                        }
                        if (context.flags & 4 /* GenerateNamesForShadowedTypeParams */ && type.flags & 262144 /* TypeParameter */ && !isTypeSymbolAccessible(type.symbol, context.enclosingDeclaration)) {
                            const name2 = typeParameterToName(type, context);
                            context.approximateLength += idText(name2).length;
                            return factory.createTypeReferenceNode(factory.createIdentifier(idText(name2)), 
                            /*typeArguments*/
                            void 0);
                        }
                        if (type.symbol) {
                            return symbolToTypeNode(type.symbol, context, 788968 /* Type */);
                        }
                        const name = (type === markerSuperTypeForCheck || type === markerSubTypeForCheck) && varianceTypeParameter && varianceTypeParameter.symbol ? (type === markerSubTypeForCheck ? "sub-" : "super-") + symbolName(varianceTypeParameter.symbol) : "?";
                        return factory.createTypeReferenceNode(factory.createIdentifier(name), 
                        /*typeArguments*/
                        void 0);
                    }
                    if (type.flags & 1048576 /* Union */ && type.origin) {
                        type = type.origin;
                    }
                    if (type.flags & (1048576 /* Union */ | 2097152 /* Intersection */)) {
                        const types = type.flags & 1048576 /* Union */ ? formatUnionTypes(type.types) : type.types;
                        if (length(types) === 1) {
                            return typeToTypeNodeHelper(types[0], context);
                        }
                        const typeNodes = mapToTypeNodes(types, context, 
                        /*isBareList*/
                        true);
                        if (typeNodes && typeNodes.length > 0) {
                            return type.flags & 1048576 /* Union */ ? factory.createUnionTypeNode(typeNodes) : factory.createIntersectionTypeNode(typeNodes);
                        }
                        else {
                            if (!context.encounteredError && !(context.flags & 262144 /* AllowEmptyUnionOrIntersection */)) {
                                context.encounteredError = true;
                            }
                            return void 0;
                        }
                    }
                    if (objectFlags & (16 /* Anonymous */ | 32 /* Mapped */)) {
                        Debug.assert(!!(type.flags & 524288 /* Object */));
                        return createAnonymousTypeNode(type);
                    }
                    if (type.flags & 4194304 /* Index */) {
                        const indexedType = type.type;
                        context.approximateLength += 6;
                        const indexTypeNode = typeToTypeNodeHelper(indexedType, context);
                        return factory.createTypeOperatorNode(141 /* KeyOfKeyword */, indexTypeNode);
                    }
                    if (type.flags & 134217728 /* TemplateLiteral */) {
                        const texts = type.texts;
                        const types = type.types;
                        const templateHead = factory.createTemplateHead(texts[0]);
                        const templateSpans = factory.createNodeArray(map(types, (t, i) => factory.createTemplateLiteralTypeSpan(typeToTypeNodeHelper(t, context), (i < types.length - 1 ? factory.createTemplateMiddle : factory.createTemplateTail)(texts[i + 1]))));
                        context.approximateLength += 2;
                        return factory.createTemplateLiteralType(templateHead, templateSpans);
                    }
                    if (type.flags & 268435456 /* StringMapping */) {
                        const typeNode = typeToTypeNodeHelper(type.type, context);
                        return symbolToTypeNode(type.symbol, context, 788968 /* Type */, [typeNode]);
                    }
                    if (type.flags & 8388608 /* IndexedAccess */) {
                        const objectTypeNode = typeToTypeNodeHelper(type.objectType, context);
                        const indexTypeNode = typeToTypeNodeHelper(type.indexType, context);
                        context.approximateLength += 2;
                        return factory.createIndexedAccessTypeNode(objectTypeNode, indexTypeNode);
                    }
                    if (type.flags & 16777216 /* Conditional */) {
                        return visitAndTransformType(type, (type2) => conditionalTypeToTypeNode(type2));
                    }
                    if (type.flags & 33554432 /* Substitution */) {
                        return typeToTypeNodeHelper(type.baseType, context);
                    }
                    return Debug.fail("Should be unreachable.");
                    function conditionalTypeToTypeNode(type2) {
                        const checkTypeNode = typeToTypeNodeHelper(type2.checkType, context);
                        context.approximateLength += 15;
                        if (context.flags & 4 /* GenerateNamesForShadowedTypeParams */ && type2.root.isDistributive && !(type2.checkType.flags & 262144 /* TypeParameter */)) {
                            const newParam = createTypeParameter(createSymbol(262144 /* TypeParameter */, "T"));
                            const name = typeParameterToName(newParam, context);
                            const newTypeVariable = factory.createTypeReferenceNode(name);
                            context.approximateLength += 37;
                            const newMapper = prependTypeMapping(type2.root.checkType, newParam, type2.mapper);
                            const saveInferTypeParameters2 = context.inferTypeParameters;
                            context.inferTypeParameters = type2.root.inferTypeParameters;
                            const extendsTypeNode2 = typeToTypeNodeHelper(instantiateType(type2.root.extendsType, newMapper), context);
                            context.inferTypeParameters = saveInferTypeParameters2;
                            const trueTypeNode2 = typeToTypeNodeOrCircularityElision(instantiateType(getTypeFromTypeNode(type2.root.node.trueType), newMapper));
                            const falseTypeNode2 = typeToTypeNodeOrCircularityElision(instantiateType(getTypeFromTypeNode(type2.root.node.falseType), newMapper));
                            return factory.createConditionalTypeNode(checkTypeNode, factory.createInferTypeNode(factory.createTypeParameterDeclaration(
                            /*modifiers*/
                            void 0, factory.cloneNode(newTypeVariable.typeName))), factory.createConditionalTypeNode(factory.createTypeReferenceNode(factory.cloneNode(name)), typeToTypeNodeHelper(type2.checkType, context), factory.createConditionalTypeNode(newTypeVariable, extendsTypeNode2, trueTypeNode2, falseTypeNode2), factory.createKeywordTypeNode(144 /* NeverKeyword */)), factory.createKeywordTypeNode(144 /* NeverKeyword */));
                        }
                        const saveInferTypeParameters = context.inferTypeParameters;
                        context.inferTypeParameters = type2.root.inferTypeParameters;
                        const extendsTypeNode = typeToTypeNodeHelper(type2.extendsType, context);
                        context.inferTypeParameters = saveInferTypeParameters;
                        const trueTypeNode = typeToTypeNodeOrCircularityElision(getTrueTypeFromConditionalType(type2));
                        const falseTypeNode = typeToTypeNodeOrCircularityElision(getFalseTypeFromConditionalType(type2));
                        return factory.createConditionalTypeNode(checkTypeNode, extendsTypeNode, trueTypeNode, falseTypeNode);
                    }
                    function typeToTypeNodeOrCircularityElision(type2) {
                        var _a3, _b2, _c;
                        if (type2.flags & 1048576 /* Union */) {
                            if ((_a3 = context.visitedTypes) == null ? void 0 : _a3.has(getTypeId(type2))) {
                                if (!(context.flags & 131072 /* AllowAnonymousIdentifier */)) {
                                    context.encounteredError = true;
                                    (_c = (_b2 = context.tracker) == null ? void 0 : _b2.reportCyclicStructureError) == null ? void 0 : _c.call(_b2);
                                }
                                return createElidedInformationPlaceholder(context);
                            }
                            return visitAndTransformType(type2, (type3) => typeToTypeNodeHelper(type3, context));
                        }
                        return typeToTypeNodeHelper(type2, context);
                    }
                    function isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) {
                        return isMappedTypeWithKeyofConstraintDeclaration(type2) && !(getModifiersTypeFromMappedType(type2).flags & 262144 /* TypeParameter */);
                    }
                    function createMappedTypeNodeFromType(type2) {
                        Debug.assert(!!(type2.flags & 524288 /* Object */));
                        const readonlyToken = type2.declaration.readonlyToken ? factory.createToken(type2.declaration.readonlyToken.kind) : void 0;
                        const questionToken = type2.declaration.questionToken ? factory.createToken(type2.declaration.questionToken.kind) : void 0;
                        let appropriateConstraintTypeNode;
                        let newTypeVariable;
                        if (isMappedTypeWithKeyofConstraintDeclaration(type2)) {
                            if (isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) && context.flags & 4 /* GenerateNamesForShadowedTypeParams */) {
                                const newParam = createTypeParameter(createSymbol(262144 /* TypeParameter */, "T"));
                                const name = typeParameterToName(newParam, context);
                                newTypeVariable = factory.createTypeReferenceNode(name);
                            }
                            appropriateConstraintTypeNode = factory.createTypeOperatorNode(141 /* KeyOfKeyword */, newTypeVariable || typeToTypeNodeHelper(getModifiersTypeFromMappedType(type2), context));
                        }
                        else {
                            appropriateConstraintTypeNode = typeToTypeNodeHelper(getConstraintTypeFromMappedType(type2), context);
                        }
                        const typeParameterNode = typeParameterToDeclarationWithConstraint(getTypeParameterFromMappedType(type2), context, appropriateConstraintTypeNode);
                        const nameTypeNode = type2.declaration.nameType ? typeToTypeNodeHelper(getNameTypeFromMappedType(type2), context) : void 0;
                        const templateTypeNode = typeToTypeNodeHelper(removeMissingType(getTemplateTypeFromMappedType(type2), !!(getMappedTypeModifiers(type2) & 4 /* IncludeOptional */)), context);
                        const mappedTypeNode = factory.createMappedTypeNode(readonlyToken, typeParameterNode, nameTypeNode, questionToken, templateTypeNode, 
                        /*members*/
                        void 0);
                        context.approximateLength += 10;
                        const result = setEmitFlags(mappedTypeNode, 1 /* SingleLine */);
                        if (isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) && context.flags & 4 /* GenerateNamesForShadowedTypeParams */) {
                            const originalConstraint = instantiateType(getConstraintOfTypeParameter(getTypeFromTypeNode(type2.declaration.typeParameter.constraint.type)) || unknownType, type2.mapper);
                            return factory.createConditionalTypeNode(typeToTypeNodeHelper(getModifiersTypeFromMappedType(type2), context), factory.createInferTypeNode(factory.createTypeParameterDeclaration(
                            /*modifiers*/
                            void 0, factory.cloneNode(newTypeVariable.typeName), originalConstraint.flags & 2 /* Unknown */ ? void 0 : typeToTypeNodeHelper(originalConstraint, context))), result, factory.createKeywordTypeNode(144 /* NeverKeyword */));
                        }
                        return result;
                    }
                    function createAnonymousTypeNode(type2) {
                        var _a3, _b2;
                        const typeId = type2.id;
                        const symbol = type2.symbol;
                        if (symbol) {
                            const isInstanceType = isClassInstanceSide(type2) ? 788968 /* Type */ : 111551 /* Value */;
                            if (isJSConstructor(symbol.valueDeclaration)) {
                                return symbolToTypeNode(symbol, context, isInstanceType);
                            }
                            else if (symbol.flags & 32 /* Class */ && !getBaseTypeVariableOfClass(symbol) && !(symbol.valueDeclaration && isClassLike(symbol.valueDeclaration) && context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ && (!isClassDeclaration(symbol.valueDeclaration) || isSymbolAccessible(symbol, context.enclosingDeclaration, isInstanceType, 
                            /*computeAliases*/
                            false).accessibility !== 0 /* Accessible */)) || symbol.flags & (384 /* Enum */ | 512 /* ValueModule */) || shouldWriteTypeOfFunctionSymbol()) {
                                return symbolToTypeNode(symbol, context, isInstanceType);
                            }
                            else if ((_a3 = context.visitedTypes) == null ? void 0 : _a3.has(typeId)) {
                                const typeAlias = getTypeAliasForTypeLiteral(type2);
                                if (typeAlias) {
                                    return symbolToTypeNode(typeAlias, context, 788968 /* Type */);
                                }
                                else {
                                    return createElidedInformationPlaceholder(context);
                                }
                            }
                            else {
                                return visitAndTransformType(type2, createTypeNodeFromObjectType);
                            }
                        }
                        else {
                            const isInstantiationExpressionType = !!(getObjectFlags(type2) & 8388608 /* InstantiationExpressionType */);
                            if (isInstantiationExpressionType) {
                                const instantiationExpressionType = type2;
                                if (isTypeQueryNode(instantiationExpressionType.node)) {
                                    const typeNode = serializeExistingTypeNode(context, instantiationExpressionType.node);
                                    if (typeNode) {
                                        return typeNode;
                                    }
                                }
                                if ((_b2 = context.visitedTypes) == null ? void 0 : _b2.has(typeId)) {
                                    return createElidedInformationPlaceholder(context);
                                }
                                return visitAndTransformType(type2, createTypeNodeFromObjectType);
                            }
                            return createTypeNodeFromObjectType(type2);
                        }
                        function shouldWriteTypeOfFunctionSymbol() {
                            var _a4;
                            const isStaticMethodSymbol = !!(symbol.flags & 8192 /* Method */) && // typeof static method
                                some(symbol.declarations, (declaration) => isStatic(declaration));
                            const isNonLocalFunctionSymbol = !!(symbol.flags & 16 /* Function */) && (symbol.parent || // is exported function symbol
                                forEach(symbol.declarations, (declaration) => declaration.parent.kind === 308 /* SourceFile */ || declaration.parent.kind === 265 /* ModuleBlock */));
                            if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                                return (!!(context.flags & 4096 /* UseTypeOfFunction */) || ((_a4 = context.visitedTypes) == null ? void 0 : _a4.has(typeId))) && // it is type of the symbol uses itself recursively
                                    (!(context.flags & 8 /* UseStructuralFallback */) || isValueSymbolAccessible(symbol, context.enclosingDeclaration));
                            }
                        }
                    }
                    function visitAndTransformType(type2, transform2) {
                        var _a3, _b2;
                        const typeId = type2.id;
                        const isConstructorObject = getObjectFlags(type2) & 16 /* Anonymous */ && type2.symbol && type2.symbol.flags & 32 /* Class */;
                        const id = getObjectFlags(type2) & 4 /* Reference */ && type2.node ? "N" + getNodeId(type2.node) : type2.flags & 16777216 /* Conditional */ ? "N" + getNodeId(type2.root.node) : type2.symbol ? (isConstructorObject ? "+" : "") + getSymbolId(type2.symbol) : void 0;
                        if (!context.visitedTypes) {
                            context.visitedTypes = /* @__PURE__ */ new Set();
                        }
                        if (id && !context.symbolDepth) {
                            context.symbolDepth = /* @__PURE__ */ new Map();
                        }
                        const links = context.enclosingDeclaration && getNodeLinks(context.enclosingDeclaration);
                        const key = `${getTypeId(type2)}|${context.flags}`;
                        if (links) {
                            links.serializedTypes || (links.serializedTypes = /* @__PURE__ */ new Map());
                        }
                        const cachedResult = (_a3 = links == null ? void 0 : links.serializedTypes) == null ? void 0 : _a3.get(key);
                        if (cachedResult) {
                            if (cachedResult.truncating) {
                                context.truncating = true;
                            }
                            context.approximateLength += cachedResult.addedLength;
                            return deepCloneOrReuseNode(cachedResult.node);
                        }
                        let depth;
                        if (id) {
                            depth = context.symbolDepth.get(id) || 0;
                            if (depth > 10) {
                                return createElidedInformationPlaceholder(context);
                            }
                            context.symbolDepth.set(id, depth + 1);
                        }
                        context.visitedTypes.add(typeId);
                        const startLength = context.approximateLength;
                        const result = transform2(type2);
                        const addedLength = context.approximateLength - startLength;
                        if (!context.reportedDiagnostic && !context.encounteredError) {
                            (_b2 = links == null ? void 0 : links.serializedTypes) == null ? void 0 : _b2.set(key, { node: result, truncating: context.truncating, addedLength });
                        }
                        context.visitedTypes.delete(typeId);
                        if (id) {
                            context.symbolDepth.set(id, depth);
                        }
                        return result;
                        function deepCloneOrReuseNode(node) {
                            if (!nodeIsSynthesized(node) && getParseTreeNode(node) === node) {
                                return node;
                            }
                            return setTextRange(factory.cloneNode(visitEachChild(node, deepCloneOrReuseNode, nullTransformationContext, deepCloneOrReuseNodes)), node);
                        }
                        function deepCloneOrReuseNodes(nodes, visitor, test, start, count) {
                            if (nodes && nodes.length === 0) {
                                return setTextRange(factory.createNodeArray(
                                /*nodes*/
                                void 0, nodes.hasTrailingComma), nodes);
                            }
                            return visitNodes2(nodes, visitor, test, start, count);
                        }
                    }
                    function createTypeNodeFromObjectType(type2) {
                        if (isGenericMappedType(type2) || type2.containsError) {
                            return createMappedTypeNodeFromType(type2);
                        }
                        const resolved = resolveStructuredTypeMembers(type2);
                        if (!resolved.properties.length && !resolved.indexInfos.length) {
                            if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                                context.approximateLength += 2;
                                return setEmitFlags(factory.createTypeLiteralNode(
                                /*members*/
                                void 0), 1 /* SingleLine */);
                            }
                            if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                                const signature = resolved.callSignatures[0];
                                const signatureNode = signatureToSignatureDeclarationHelper(signature, 181 /* FunctionType */, context);
                                return signatureNode;
                            }
                            if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                                const signature = resolved.constructSignatures[0];
                                const signatureNode = signatureToSignatureDeclarationHelper(signature, 182 /* ConstructorType */, context);
                                return signatureNode;
                            }
                        }
                        const abstractSignatures = filter(resolved.constructSignatures, (signature) => !!(signature.flags & 4 /* Abstract */));
                        if (some(abstractSignatures)) {
                            const types = map(abstractSignatures, getOrCreateTypeFromSignature);
                            const typeElementCount = resolved.callSignatures.length + (resolved.constructSignatures.length - abstractSignatures.length) + resolved.indexInfos.length + // exclude `prototype` when writing a class expression as a type literal, as per
                                // the logic in `createTypeNodesFromResolvedType`.
                                (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ ? countWhere(resolved.properties, (p) => !(p.flags & 4194304 /* Prototype */)) : length(resolved.properties));
                            if (typeElementCount) {
                                types.push(getResolvedTypeWithoutAbstractConstructSignatures(resolved));
                            }
                            return typeToTypeNodeHelper(getIntersectionType(types), context);
                        }
                        const savedFlags = context.flags;
                        context.flags |= 4194304 /* InObjectTypeLiteral */;
                        const members = createTypeNodesFromResolvedType(resolved);
                        context.flags = savedFlags;
                        const typeLiteralNode = factory.createTypeLiteralNode(members);
                        context.approximateLength += 2;
                        setEmitFlags(typeLiteralNode, context.flags & 1024 /* MultilineObjectLiterals */ ? 0 : 1 /* SingleLine */);
                        return typeLiteralNode;
                    }
                    function typeReferenceToTypeNode(type2) {
                        let typeArguments = getTypeArguments(type2);
                        if (type2.target === globalArrayType || type2.target === globalReadonlyArrayType) {
                            if (context.flags & 2 /* WriteArrayAsGenericType */) {
                                const typeArgumentNode = typeToTypeNodeHelper(typeArguments[0], context);
                                return factory.createTypeReferenceNode(type2.target === globalArrayType ? "Array" : "ReadonlyArray", [typeArgumentNode]);
                            }
                            const elementType = typeToTypeNodeHelper(typeArguments[0], context);
                            const arrayType = factory.createArrayTypeNode(elementType);
                            return type2.target === globalArrayType ? arrayType : factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, arrayType);
                        }
                        else if (type2.target.objectFlags & 8 /* Tuple */) {
                            typeArguments = sameMap(typeArguments, (t, i) => removeMissingType(t, !!(type2.target.elementFlags[i] & 2 /* Optional */)));
                            if (typeArguments.length > 0) {
                                const arity = getTypeReferenceArity(type2);
                                const tupleConstituentNodes = mapToTypeNodes(typeArguments.slice(0, arity), context);
                                if (tupleConstituentNodes) {
                                    if (type2.target.labeledElementDeclarations) {
                                        for (let i = 0; i < tupleConstituentNodes.length; i++) {
                                            const flags = type2.target.elementFlags[i];
                                            tupleConstituentNodes[i] = factory.createNamedTupleMember(flags & 12 /* Variable */ ? factory.createToken(25 /* DotDotDotToken */) : void 0, factory.createIdentifier(unescapeLeadingUnderscores(getTupleElementLabel(type2.target.labeledElementDeclarations[i]))), flags & 2 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, flags & 4 /* Rest */ ? factory.createArrayTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i]);
                                        }
                                    }
                                    else {
                                        for (let i = 0; i < Math.min(arity, tupleConstituentNodes.length); i++) {
                                            const flags = type2.target.elementFlags[i];
                                            tupleConstituentNodes[i] = flags & 12 /* Variable */ ? factory.createRestTypeNode(flags & 4 /* Rest */ ? factory.createArrayTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i]) : flags & 2 /* Optional */ ? factory.createOptionalTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i];
                                        }
                                    }
                                    const tupleTypeNode = setEmitFlags(factory.createTupleTypeNode(tupleConstituentNodes), 1 /* SingleLine */);
                                    return type2.target.readonly ? factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, tupleTypeNode) : tupleTypeNode;
                                }
                            }
                            if (context.encounteredError || context.flags & 524288 /* AllowEmptyTuple */) {
                                const tupleTypeNode = setEmitFlags(factory.createTupleTypeNode([]), 1 /* SingleLine */);
                                return type2.target.readonly ? factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, tupleTypeNode) : tupleTypeNode;
                            }
                            context.encounteredError = true;
                            return void 0;
                        }
                        else if (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ && type2.symbol.valueDeclaration && isClassLike(type2.symbol.valueDeclaration) && !isValueSymbolAccessible(type2.symbol, context.enclosingDeclaration)) {
                            return createAnonymousTypeNode(type2);
                        }
                        else {
                            const outerTypeParameters = type2.target.outerTypeParameters;
                            let i = 0;
                            let resultType;
                            if (outerTypeParameters) {
                                const length2 = outerTypeParameters.length;
                                while (i < length2) {
                                    const start = i;
                                    const parent2 = getParentSymbolOfTypeParameter(outerTypeParameters[i]);
                                    do {
                                        i++;
                                    } while (i < length2 && getParentSymbolOfTypeParameter(outerTypeParameters[i]) === parent2);
                                    if (!rangeEquals(outerTypeParameters, typeArguments, start, i)) {
                                        const typeArgumentSlice = mapToTypeNodes(typeArguments.slice(start, i), context);
                                        const flags2 = context.flags;
                                        context.flags |= 16 /* ForbidIndexedAccessSymbolReferences */;
                                        const ref = symbolToTypeNode(parent2, context, 788968 /* Type */, typeArgumentSlice);
                                        context.flags = flags2;
                                        resultType = !resultType ? ref : appendReferenceToType(resultType, ref);
                                    }
                                }
                            }
                            let typeArgumentNodes;
                            if (typeArguments.length > 0) {
                                const typeParameterCount = (type2.target.typeParameters || emptyArray).length;
                                typeArgumentNodes = mapToTypeNodes(typeArguments.slice(i, typeParameterCount), context);
                            }
                            const flags = context.flags;
                            context.flags |= 16 /* ForbidIndexedAccessSymbolReferences */;
                            const finalRef = symbolToTypeNode(type2.symbol, context, 788968 /* Type */, typeArgumentNodes);
                            context.flags = flags;
                            return !resultType ? finalRef : appendReferenceToType(resultType, finalRef);
                        }
                    }
                    function appendReferenceToType(root, ref) {
                        if (isImportTypeNode(root)) {
                            let typeArguments = root.typeArguments;
                            let qualifier = root.qualifier;
                            if (qualifier) {
                                if (isIdentifier(qualifier)) {
                                    if (typeArguments !== getIdentifierTypeArguments(qualifier)) {
                                        qualifier = setIdentifierTypeArguments(factory.cloneNode(qualifier), typeArguments);
                                    }
                                }
                                else {
                                    if (typeArguments !== getIdentifierTypeArguments(qualifier.right)) {
                                        qualifier = factory.updateQualifiedName(qualifier, qualifier.left, setIdentifierTypeArguments(factory.cloneNode(qualifier.right), typeArguments));
                                    }
                                }
                            }
                            typeArguments = ref.typeArguments;
                            const ids = getAccessStack(ref);
                            for (const id of ids) {
                                qualifier = qualifier ? factory.createQualifiedName(qualifier, id) : id;
                            }
                            return factory.updateImportTypeNode(root, root.argument, root.assertions, qualifier, typeArguments, root.isTypeOf);
                        }
                        else {
                            let typeArguments = root.typeArguments;
                            let typeName = root.typeName;
                            if (isIdentifier(typeName)) {
                                if (typeArguments !== getIdentifierTypeArguments(typeName)) {
                                    typeName = setIdentifierTypeArguments(factory.cloneNode(typeName), typeArguments);
                                }
                            }
                            else {
                                if (typeArguments !== getIdentifierTypeArguments(typeName.right)) {
                                    typeName = factory.updateQualifiedName(typeName, typeName.left, setIdentifierTypeArguments(factory.cloneNode(typeName.right), typeArguments));
                                }
                            }
                            typeArguments = ref.typeArguments;
                            const ids = getAccessStack(ref);
                            for (const id of ids) {
                                typeName = factory.createQualifiedName(typeName, id);
                            }
                            return factory.updateTypeReferenceNode(root, typeName, typeArguments);
                        }
                    }
                    function getAccessStack(ref) {
                        let state = ref.typeName;
                        const ids = [];
                        while (!isIdentifier(state)) {
                            ids.unshift(state.right);
                            state = state.left;
                        }
                        ids.unshift(state);
                        return ids;
                    }
                    function createTypeNodesFromResolvedType(resolvedType) {
                        if (checkTruncationLength(context)) {
                            return [factory.createPropertySignature(
                                /*modifiers*/
                                void 0, "...", 
                                /*questionToken*/
                                void 0, 
                                /*type*/
                                void 0)];
                        }
                        const typeElements = [];
                        for (const signature of resolvedType.callSignatures) {
                            typeElements.push(signatureToSignatureDeclarationHelper(signature, 176 /* CallSignature */, context));
                        }
                        for (const signature of resolvedType.constructSignatures) {
                            if (signature.flags & 4 /* Abstract */)
                                continue;
                            typeElements.push(signatureToSignatureDeclarationHelper(signature, 177 /* ConstructSignature */, context));
                        }
                        for (const info of resolvedType.indexInfos) {
                            typeElements.push(indexInfoToIndexSignatureDeclarationHelper(info, context, resolvedType.objectFlags & 1024 /* ReverseMapped */ ? createElidedInformationPlaceholder(context) : void 0));
                        }
                        const properties = resolvedType.properties;
                        if (!properties) {
                            return typeElements;
                        }
                        let i = 0;
                        for (const propertySymbol of properties) {
                            i++;
                            if (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */) {
                                if (propertySymbol.flags & 4194304 /* Prototype */) {
                                    continue;
                                }
                                if (getDeclarationModifierFlagsFromSymbol(propertySymbol) & (8 /* Private */ | 16 /* Protected */) && context.tracker.reportPrivateInBaseOfClassExpression) {
                                    context.tracker.reportPrivateInBaseOfClassExpression(unescapeLeadingUnderscores(propertySymbol.escapedName));
                                }
                            }
                            if (checkTruncationLength(context) && i + 2 < properties.length - 1) {
                                typeElements.push(factory.createPropertySignature(
                                /*modifiers*/
                                void 0, `... ${properties.length - i} more ...`, 
                                /*questionToken*/
                                void 0, 
                                /*type*/
                                void 0));
                                addPropertyToElementList(properties[properties.length - 1], context, typeElements);
                                break;
                            }
                            addPropertyToElementList(propertySymbol, context, typeElements);
                        }
                        return typeElements.length ? typeElements : void 0;
                    }
                }