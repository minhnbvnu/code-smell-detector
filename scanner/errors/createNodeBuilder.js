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
                function addPropertyToElementList(propertySymbol, context, typeElements) {
                    var _a2;
                    const propertyIsReverseMapped = !!(getCheckFlags(propertySymbol) & 8192 /* ReverseMapped */);
                    const propertyType = shouldUsePlaceholderForProperty(propertySymbol, context) ? anyType : getNonMissingTypeOfSymbol(propertySymbol);
                    const saveEnclosingDeclaration = context.enclosingDeclaration;
                    context.enclosingDeclaration = void 0;
                    if (context.tracker.canTrackSymbol && isLateBoundName(propertySymbol.escapedName)) {
                        if (propertySymbol.declarations) {
                            const decl = first(propertySymbol.declarations);
                            if (hasLateBindableName(decl)) {
                                if (isBinaryExpression(decl)) {
                                    const name = getNameOfDeclaration(decl);
                                    if (name && isElementAccessExpression(name) && isPropertyAccessEntityNameExpression(name.argumentExpression)) {
                                        trackComputedName(name.argumentExpression, saveEnclosingDeclaration, context);
                                    }
                                }
                                else {
                                    trackComputedName(decl.name.expression, saveEnclosingDeclaration, context);
                                }
                            }
                        }
                        else {
                            context.tracker.reportNonSerializableProperty(symbolToString(propertySymbol));
                        }
                    }
                    context.enclosingDeclaration = propertySymbol.valueDeclaration || ((_a2 = propertySymbol.declarations) == null ? void 0 : _a2[0]) || saveEnclosingDeclaration;
                    const propertyName = getPropertyNameNodeForSymbol(propertySymbol, context);
                    context.enclosingDeclaration = saveEnclosingDeclaration;
                    context.approximateLength += symbolName(propertySymbol).length + 1;
                    const optionalToken = propertySymbol.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0;
                    if (propertySymbol.flags & (16 /* Function */ | 8192 /* Method */) && !getPropertiesOfObjectType(propertyType).length && !isReadonlySymbol(propertySymbol)) {
                        const signatures = getSignaturesOfType(filterType(propertyType, (t) => !(t.flags & 32768 /* Undefined */)), 0 /* Call */);
                        for (const signature of signatures) {
                            const methodDeclaration = signatureToSignatureDeclarationHelper(signature, 170 /* MethodSignature */, context, { name: propertyName, questionToken: optionalToken });
                            typeElements.push(preserveCommentsOn(methodDeclaration));
                        }
                    }
                    else {
                        let propertyTypeNode;
                        if (shouldUsePlaceholderForProperty(propertySymbol, context)) {
                            propertyTypeNode = createElidedInformationPlaceholder(context);
                        }
                        else {
                            if (propertyIsReverseMapped) {
                                context.reverseMappedStack || (context.reverseMappedStack = []);
                                context.reverseMappedStack.push(propertySymbol);
                            }
                            propertyTypeNode = propertyType ? serializeTypeForDeclaration(context, propertyType, propertySymbol, saveEnclosingDeclaration) : factory.createKeywordTypeNode(131 /* AnyKeyword */);
                            if (propertyIsReverseMapped) {
                                context.reverseMappedStack.pop();
                            }
                        }
                        const modifiers = isReadonlySymbol(propertySymbol) ? [factory.createToken(146 /* ReadonlyKeyword */)] : void 0;
                        if (modifiers) {
                            context.approximateLength += 9;
                        }
                        const propertySignature = factory.createPropertySignature(modifiers, propertyName, optionalToken, propertyTypeNode);
                        typeElements.push(preserveCommentsOn(propertySignature));
                    }
                    function preserveCommentsOn(node) {
                        var _a3;
                        if (some(propertySymbol.declarations, (d) => d.kind === 351 /* JSDocPropertyTag */)) {
                            const d = (_a3 = propertySymbol.declarations) == null ? void 0 : _a3.find((d2) => d2.kind === 351 /* JSDocPropertyTag */);
                            const commentText = getTextOfJSDocComment(d.comment);
                            if (commentText) {
                                setSyntheticLeadingComments(node, [{ kind: 3 /* MultiLineCommentTrivia */, text: "*\n * " + commentText.replace(/\n/g, "\n * ") + "\n ", pos: -1, end: -1, hasTrailingNewLine: true }]);
                            }
                        }
                        else if (propertySymbol.valueDeclaration) {
                            setCommentRange(node, propertySymbol.valueDeclaration);
                        }
                        return node;
                    }
                }
                function signatureToSignatureDeclarationHelper(signature, kind, context, options) {
                    var _a2, _b, _c, _d, _e;
                    const suppressAny = context.flags & 256 /* SuppressAnyReturnType */;
                    if (suppressAny)
                        context.flags &= ~256 /* SuppressAnyReturnType */;
                    context.approximateLength += 3;
                    let typeParameters;
                    let typeArguments;
                    if (context.flags & 32 /* WriteTypeArgumentsOfSignature */ && signature.target && signature.mapper && signature.target.typeParameters) {
                        typeArguments = signature.target.typeParameters.map((parameter) => typeToTypeNodeHelper(instantiateType(parameter, signature.mapper), context));
                    }
                    else {
                        typeParameters = signature.typeParameters && signature.typeParameters.map((parameter) => typeParameterToDeclaration(parameter, context));
                    }
                    const expandedParams = getExpandedParameters(signature, 
                    /*skipUnionExpanding*/
                    true)[0];
                    let cleanup;
                    if (context.enclosingDeclaration && signature.declaration && signature.declaration !== context.enclosingDeclaration && !isInJSFile(signature.declaration) && some(expandedParams)) {
                        const existingFakeScope = getNodeLinks(context.enclosingDeclaration).fakeScopeForSignatureDeclaration ? context.enclosingDeclaration : void 0;
                        Debug.assertOptionalNode(existingFakeScope, isBlock);
                        const locals = (_a2 = existingFakeScope == null ? void 0 : existingFakeScope.locals) != null ? _a2 : createSymbolTable();
                        let newLocals;
                        for (const param of expandedParams) {
                            if (!locals.has(param.escapedName)) {
                                newLocals = append(newLocals, param.escapedName);
                                locals.set(param.escapedName, param);
                            }
                        }
                        if (newLocals) {
                            let removeNewLocals2 = function () {
                                forEach(newLocals, (s) => locals.delete(s));
                            };
                            var removeNewLocals = removeNewLocals2;
                            if (existingFakeScope) {
                                cleanup = removeNewLocals2;
                            }
                            else {
                                const fakeScope = parseNodeFactory.createBlock(emptyArray);
                                getNodeLinks(fakeScope).fakeScopeForSignatureDeclaration = true;
                                fakeScope.locals = locals;
                                const saveEnclosingDeclaration = context.enclosingDeclaration;
                                setParent(fakeScope, saveEnclosingDeclaration);
                                context.enclosingDeclaration = fakeScope;
                                cleanup = () => {
                                    context.enclosingDeclaration = saveEnclosingDeclaration;
                                    removeNewLocals2();
                                };
                            }
                        }
                    }
                    const parameters = (some(expandedParams, (p) => p !== expandedParams[expandedParams.length - 1] && !!(getCheckFlags(p) & 32768 /* RestParameter */)) ? signature.parameters : expandedParams).map((parameter) => symbolToParameterDeclaration(parameter, context, kind === 173 /* Constructor */, options == null ? void 0 : options.privateSymbolVisitor, options == null ? void 0 : options.bundledImports));
                    const thisParameter = context.flags & 33554432 /* OmitThisParameter */ ? void 0 : tryGetThisParameterDeclaration(signature, context);
                    if (thisParameter) {
                        parameters.unshift(thisParameter);
                    }
                    let returnTypeNode;
                    const typePredicate = getTypePredicateOfSignature(signature);
                    if (typePredicate) {
                        const assertsModifier = typePredicate.kind === 2 /* AssertsThis */ || typePredicate.kind === 3 /* AssertsIdentifier */ ? factory.createToken(129 /* AssertsKeyword */) : void 0;
                        const parameterName = typePredicate.kind === 1 /* Identifier */ || typePredicate.kind === 3 /* AssertsIdentifier */ ? setEmitFlags(factory.createIdentifier(typePredicate.parameterName), 33554432 /* NoAsciiEscaping */) : factory.createThisTypeNode();
                        const typeNode = typePredicate.type && typeToTypeNodeHelper(typePredicate.type, context);
                        returnTypeNode = factory.createTypePredicateNode(assertsModifier, parameterName, typeNode);
                    }
                    else {
                        const returnType = getReturnTypeOfSignature(signature);
                        if (returnType && !(suppressAny && isTypeAny(returnType))) {
                            returnTypeNode = serializeReturnTypeForSignature(context, returnType, signature, options == null ? void 0 : options.privateSymbolVisitor, options == null ? void 0 : options.bundledImports);
                        }
                        else if (!suppressAny) {
                            returnTypeNode = factory.createKeywordTypeNode(131 /* AnyKeyword */);
                        }
                    }
                    let modifiers = options == null ? void 0 : options.modifiers;
                    if (kind === 182 /* ConstructorType */ && signature.flags & 4 /* Abstract */) {
                        const flags = modifiersToFlags(modifiers);
                        modifiers = factory.createModifiersFromModifierFlags(flags | 256 /* Abstract */);
                    }
                    const node = kind === 176 /* CallSignature */ ? factory.createCallSignature(typeParameters, parameters, returnTypeNode) : kind === 177 /* ConstructSignature */ ? factory.createConstructSignature(typeParameters, parameters, returnTypeNode) : kind === 170 /* MethodSignature */ ? factory.createMethodSignature(modifiers, (_b = options == null ? void 0 : options.name) != null ? _b : factory.createIdentifier(""), options == null ? void 0 : options.questionToken, typeParameters, parameters, returnTypeNode) : kind === 171 /* MethodDeclaration */ ? factory.createMethodDeclaration(modifiers, 
                    /*asteriskToken*/
                    void 0, (_c = options == null ? void 0 : options.name) != null ? _c : factory.createIdentifier(""), 
                    /*questionToken*/
                    void 0, typeParameters, parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 173 /* Constructor */ ? factory.createConstructorDeclaration(modifiers, parameters, 
                    /*body*/
                    void 0) : kind === 174 /* GetAccessor */ ? factory.createGetAccessorDeclaration(modifiers, (_d = options == null ? void 0 : options.name) != null ? _d : factory.createIdentifier(""), parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 175 /* SetAccessor */ ? factory.createSetAccessorDeclaration(modifiers, (_e = options == null ? void 0 : options.name) != null ? _e : factory.createIdentifier(""), parameters, 
                    /*body*/
                    void 0) : kind === 178 /* IndexSignature */ ? factory.createIndexSignature(modifiers, parameters, returnTypeNode) : kind === 320 /* JSDocFunctionType */ ? factory.createJSDocFunctionType(parameters, returnTypeNode) : kind === 181 /* FunctionType */ ? factory.createFunctionTypeNode(typeParameters, parameters, returnTypeNode != null ? returnTypeNode : factory.createTypeReferenceNode(factory.createIdentifier(""))) : kind === 182 /* ConstructorType */ ? factory.createConstructorTypeNode(modifiers, typeParameters, parameters, returnTypeNode != null ? returnTypeNode : factory.createTypeReferenceNode(factory.createIdentifier(""))) : kind === 259 /* FunctionDeclaration */ ? factory.createFunctionDeclaration(modifiers, 
                    /*asteriskToken*/
                    void 0, (options == null ? void 0 : options.name) ? cast(options.name, isIdentifier) : factory.createIdentifier(""), typeParameters, parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 215 /* FunctionExpression */ ? factory.createFunctionExpression(modifiers, 
                    /*asteriskToken*/
                    void 0, (options == null ? void 0 : options.name) ? cast(options.name, isIdentifier) : factory.createIdentifier(""), typeParameters, parameters, returnTypeNode, factory.createBlock([])) : kind === 216 /* ArrowFunction */ ? factory.createArrowFunction(modifiers, typeParameters, parameters, returnTypeNode, 
                    /*equalsGreaterThanToken*/
                    void 0, factory.createBlock([])) : Debug.assertNever(kind);
                    if (typeArguments) {
                        node.typeArguments = factory.createNodeArray(typeArguments);
                    }
                    cleanup == null ? void 0 : cleanup();
                    return node;
                }
                function getSpecifierForModuleSymbol(symbol, context, overrideImportMode) {
                    var _a2;
                    let file = getDeclarationOfKind(symbol, 308 /* SourceFile */);
                    if (!file) {
                        const equivalentFileSymbol = firstDefined(symbol.declarations, (d) => getFileSymbolIfFileSymbolExportEqualsContainer(d, symbol));
                        if (equivalentFileSymbol) {
                            file = getDeclarationOfKind(equivalentFileSymbol, 308 /* SourceFile */);
                        }
                    }
                    if (file && file.moduleName !== void 0) {
                        return file.moduleName;
                    }
                    if (!file) {
                        if (context.tracker.trackReferencedAmbientModule) {
                            const ambientDecls = filter(symbol.declarations, isAmbientModule);
                            if (length(ambientDecls)) {
                                for (const decl of ambientDecls) {
                                    context.tracker.trackReferencedAmbientModule(decl, symbol);
                                }
                            }
                        }
                        if (ambientModuleSymbolRegex.test(symbol.escapedName)) {
                            return symbol.escapedName.substring(1, symbol.escapedName.length - 1);
                        }
                    }
                    if (!context.enclosingDeclaration || !context.tracker.moduleResolverHost) {
                        if (ambientModuleSymbolRegex.test(symbol.escapedName)) {
                            return symbol.escapedName.substring(1, symbol.escapedName.length - 1);
                        }
                        return getSourceFileOfNode(getNonAugmentationDeclaration(symbol)).fileName;
                    }
                    const contextFile = getSourceFileOfNode(getOriginalNode(context.enclosingDeclaration));
                    const resolutionMode = overrideImportMode || (contextFile == null ? void 0 : contextFile.impliedNodeFormat);
                    const cacheKey = createModeAwareCacheKey(contextFile.path, resolutionMode);
                    const links = getSymbolLinks(symbol);
                    let specifier = links.specifierCache && links.specifierCache.get(cacheKey);
                    if (!specifier) {
                        const isBundle2 = !!outFile(compilerOptions);
                        const { moduleResolverHost } = context.tracker;
                        const specifierCompilerOptions = isBundle2 ? { ...compilerOptions, baseUrl: moduleResolverHost.getCommonSourceDirectory() } : compilerOptions;
                        specifier = first(getModuleSpecifiers(symbol, checker, specifierCompilerOptions, contextFile, moduleResolverHost, {
                            importModuleSpecifierPreference: isBundle2 ? "non-relative" : "project-relative",
                            importModuleSpecifierEnding: isBundle2 ? "minimal" : resolutionMode === 99 /* ESNext */ ? "js" : void 0
                        }, { overrideImportMode }));
                        (_a2 = links.specifierCache) != null ? _a2 : links.specifierCache = /* @__PURE__ */ new Map();
                        links.specifierCache.set(cacheKey, specifier);
                    }
                    return specifier;
                }
                function symbolToTypeNode(symbol, context, meaning, overrideTypeArguments) {
                    var _a2, _b, _c, _d;
                    const chain = lookupSymbolChain(symbol, context, meaning, !(context.flags & 16384 /* UseAliasDefinedOutsideCurrentScope */));
                    const isTypeOf = meaning === 111551 /* Value */;
                    if (some(chain[0].declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                        const nonRootParts = chain.length > 1 ? createAccessFromSymbolChain(chain, chain.length - 1, 1) : void 0;
                        const typeParameterNodes = overrideTypeArguments || lookupTypeParameterNodes(chain, 0, context);
                        const contextFile = getSourceFileOfNode(getOriginalNode(context.enclosingDeclaration));
                        const targetFile = getSourceFileOfModule(chain[0]);
                        let specifier;
                        let assertion;
                        if (getEmitModuleResolutionKind(compilerOptions) === 3 /* Node16 */ || getEmitModuleResolutionKind(compilerOptions) === 99 /* NodeNext */) {
                            if ((targetFile == null ? void 0 : targetFile.impliedNodeFormat) === 99 /* ESNext */ && targetFile.impliedNodeFormat !== (contextFile == null ? void 0 : contextFile.impliedNodeFormat)) {
                                specifier = getSpecifierForModuleSymbol(chain[0], context, 99 /* ESNext */);
                                assertion = factory.createImportTypeAssertionContainer(factory.createAssertClause(factory.createNodeArray([
                                    factory.createAssertEntry(factory.createStringLiteral("resolution-mode"), factory.createStringLiteral("import"))
                                ])));
                                (_b = (_a2 = context.tracker).reportImportTypeNodeResolutionModeOverride) == null ? void 0 : _b.call(_a2);
                            }
                        }
                        if (!specifier) {
                            specifier = getSpecifierForModuleSymbol(chain[0], context);
                        }
                        if (!(context.flags & 67108864 /* AllowNodeModulesRelativePaths */) && getEmitModuleResolutionKind(compilerOptions) !== 1 /* Classic */ && specifier.indexOf("/node_modules/") >= 0) {
                            const oldSpecifier = specifier;
                            if (getEmitModuleResolutionKind(compilerOptions) === 3 /* Node16 */ || getEmitModuleResolutionKind(compilerOptions) === 99 /* NodeNext */) {
                                const swappedMode = (contextFile == null ? void 0 : contextFile.impliedNodeFormat) === 99 /* ESNext */ ? 1 /* CommonJS */ : 99 /* ESNext */;
                                specifier = getSpecifierForModuleSymbol(chain[0], context, swappedMode);
                                if (specifier.indexOf("/node_modules/") >= 0) {
                                    specifier = oldSpecifier;
                                }
                                else {
                                    assertion = factory.createImportTypeAssertionContainer(factory.createAssertClause(factory.createNodeArray([
                                        factory.createAssertEntry(factory.createStringLiteral("resolution-mode"), factory.createStringLiteral(swappedMode === 99 /* ESNext */ ? "import" : "require"))
                                    ])));
                                    (_d = (_c = context.tracker).reportImportTypeNodeResolutionModeOverride) == null ? void 0 : _d.call(_c);
                                }
                            }
                            if (!assertion) {
                                context.encounteredError = true;
                                if (context.tracker.reportLikelyUnsafeImportRequiredError) {
                                    context.tracker.reportLikelyUnsafeImportRequiredError(oldSpecifier);
                                }
                            }
                        }
                        const lit = factory.createLiteralTypeNode(factory.createStringLiteral(specifier));
                        if (context.tracker.trackExternalModuleSymbolOfImportTypeNode)
                            context.tracker.trackExternalModuleSymbolOfImportTypeNode(chain[0]);
                        context.approximateLength += specifier.length + 10;
                        if (!nonRootParts || isEntityName(nonRootParts)) {
                            if (nonRootParts) {
                                const lastId = isIdentifier(nonRootParts) ? nonRootParts : nonRootParts.right;
                                setIdentifierTypeArguments(lastId, 
                                /*typeArguments*/
                                void 0);
                            }
                            return factory.createImportTypeNode(lit, assertion, nonRootParts, typeParameterNodes, isTypeOf);
                        }
                        else {
                            const splitNode = getTopmostIndexedAccessType(nonRootParts);
                            const qualifier = splitNode.objectType.typeName;
                            return factory.createIndexedAccessTypeNode(factory.createImportTypeNode(lit, assertion, qualifier, typeParameterNodes, isTypeOf), splitNode.indexType);
                        }
                    }
                    const entityName = createAccessFromSymbolChain(chain, chain.length - 1, 0);
                    if (isIndexedAccessTypeNode(entityName)) {
                        return entityName;
                    }
                    if (isTypeOf) {
                        return factory.createTypeQueryNode(entityName);
                    }
                    else {
                        const lastId = isIdentifier(entityName) ? entityName : entityName.right;
                        const lastTypeArgs = getIdentifierTypeArguments(lastId);
                        setIdentifierTypeArguments(lastId, 
                        /*typeArguments*/
                        void 0);
                        return factory.createTypeReferenceNode(entityName, lastTypeArgs);
                    }
                    function createAccessFromSymbolChain(chain2, index, stopper) {
                        const typeParameterNodes = index === chain2.length - 1 ? overrideTypeArguments : lookupTypeParameterNodes(chain2, index, context);
                        const symbol2 = chain2[index];
                        const parent2 = chain2[index - 1];
                        let symbolName2;
                        if (index === 0) {
                            context.flags |= 16777216 /* InInitialEntityName */;
                            symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                            context.approximateLength += (symbolName2 ? symbolName2.length : 0) + 1;
                            context.flags ^= 16777216 /* InInitialEntityName */;
                        }
                        else {
                            if (parent2 && getExportsOfSymbol(parent2)) {
                                const exports = getExportsOfSymbol(parent2);
                                forEachEntry(exports, (ex, name) => {
                                    if (getSymbolIfSameReference(ex, symbol2) && !isLateBoundName(name) && name !== "export=" /* ExportEquals */) {
                                        symbolName2 = unescapeLeadingUnderscores(name);
                                        return true;
                                    }
                                });
                            }
                        }
                        if (symbolName2 === void 0) {
                            const name = firstDefined(symbol2.declarations, getNameOfDeclaration);
                            if (name && isComputedPropertyName(name) && isEntityName(name.expression)) {
                                const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                                if (isEntityName(LHS)) {
                                    return factory.createIndexedAccessTypeNode(factory.createParenthesizedType(factory.createTypeQueryNode(LHS)), factory.createTypeQueryNode(name.expression));
                                }
                                return LHS;
                            }
                            symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                        }
                        context.approximateLength += symbolName2.length + 1;
                        if (!(context.flags & 16 /* ForbidIndexedAccessSymbolReferences */) && parent2 && getMembersOfSymbol(parent2) && getMembersOfSymbol(parent2).get(symbol2.escapedName) && getSymbolIfSameReference(getMembersOfSymbol(parent2).get(symbol2.escapedName), symbol2)) {
                            const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                            if (isIndexedAccessTypeNode(LHS)) {
                                return factory.createIndexedAccessTypeNode(LHS, factory.createLiteralTypeNode(factory.createStringLiteral(symbolName2)));
                            }
                            else {
                                return factory.createIndexedAccessTypeNode(factory.createTypeReferenceNode(LHS, typeParameterNodes), factory.createLiteralTypeNode(factory.createStringLiteral(symbolName2)));
                            }
                        }
                        const identifier = setEmitFlags(factory.createIdentifier(symbolName2), 33554432 /* NoAsciiEscaping */);
                        if (typeParameterNodes)
                            setIdentifierTypeArguments(identifier, factory.createNodeArray(typeParameterNodes));
                        identifier.symbol = symbol2;
                        if (index > stopper) {
                            const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                            if (!isEntityName(LHS)) {
                                return Debug.fail("Impossible construct - an export of an indexed access cannot be reachable");
                            }
                            return factory.createQualifiedName(LHS, identifier);
                        }
                        return identifier;
                    }
                }
                function serializeTypeForDeclaration(context, type, symbol, enclosingDeclaration, includePrivateSymbol, bundled) {
                    function visitExistingNodeTreeSymbols(node) {
                        if (isJSDocAllType(node) || node.kind === 322 /* JSDocNamepathType */) {
                            return factory.createKeywordTypeNode(131 /* AnyKeyword */);
                        }
                        if (isJSDocUnknownType(node)) {
                            return factory.createKeywordTypeNode(157 /* UnknownKeyword */);
                        }
                        if (isJSDocNullableType(node)) {
                            return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode), factory.createLiteralTypeNode(factory.createNull())]);
                        }
                        if (isJSDocOptionalType(node)) {
                            return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode), factory.createKeywordTypeNode(155 /* UndefinedKeyword */)]);
                        }
                        if (isJSDocNonNullableType(node)) {
                            return visitNode(node.type, visitExistingNodeTreeSymbols);
                        }
                        if (isJSDocVariadicType(node)) {
                            return factory.createArrayTypeNode(visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode));
                        }
                        if (isJSDocTypeLiteral(node)) {
                            return factory.createTypeLiteralNode(map(node.jsDocPropertyTags, (t) => {
                                const name = isIdentifier(t.name) ? t.name : t.name.right;
                                const typeViaParent = getTypeOfPropertyOfType(getTypeFromTypeNode(node), name.escapedText);
                                const overrideTypeNode = typeViaParent && t.typeExpression && getTypeFromTypeNode(t.typeExpression.type) !== typeViaParent ? typeToTypeNodeHelper(typeViaParent, context) : void 0;
                                return factory.createPropertySignature(
                                /*modifiers*/
                                void 0, name, t.isBracketed || t.typeExpression && isJSDocOptionalType(t.typeExpression.type) ? factory.createToken(57 /* QuestionToken */) : void 0, overrideTypeNode || t.typeExpression && visitNode(t.typeExpression.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }));
                        }
                        if (isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "") {
                            return setOriginalNode(factory.createKeywordTypeNode(131 /* AnyKeyword */), node);
                        }
                        if ((isExpressionWithTypeArguments(node) || isTypeReferenceNode(node)) && isJSDocIndexSignature(node)) {
                            return factory.createTypeLiteralNode([factory.createIndexSignature(
                                /*modifiers*/
                                void 0, [factory.createParameterDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*dotdotdotToken*/
                                    void 0, "x", 
                                    /*questionToken*/
                                    void 0, visitNode(node.typeArguments[0], visitExistingNodeTreeSymbols, isTypeNode))], visitNode(node.typeArguments[1], visitExistingNodeTreeSymbols, isTypeNode))]);
                        }
                        if (isJSDocFunctionType(node)) {
                            if (isJSDocConstructSignature(node)) {
                                let newTypeNode;
                                return factory.createConstructorTypeNode(
                                /*modifiers*/
                                void 0, visitNodes2(node.typeParameters, visitExistingNodeTreeSymbols, isTypeParameterDeclaration), mapDefined(node.parameters, (p, i) => p.name && isIdentifier(p.name) && p.name.escapedText === "new" ? (newTypeNode = p.type, void 0) : factory.createParameterDeclaration(
                                /*modifiers*/
                                void 0, getEffectiveDotDotDotForParameter(p), getNameForJSDocFunctionParameter(p, i), p.questionToken, visitNode(p.type, visitExistingNodeTreeSymbols, isTypeNode), 
                                /*initializer*/
                                void 0)), visitNode(newTypeNode || node.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }
                            else {
                                return factory.createFunctionTypeNode(visitNodes2(node.typeParameters, visitExistingNodeTreeSymbols, isTypeParameterDeclaration), map(node.parameters, (p, i) => factory.createParameterDeclaration(
                                /*modifiers*/
                                void 0, getEffectiveDotDotDotForParameter(p), getNameForJSDocFunctionParameter(p, i), p.questionToken, visitNode(p.type, visitExistingNodeTreeSymbols, isTypeNode), 
                                /*initializer*/
                                void 0)), visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }
                        }
                        if (isTypeReferenceNode(node) && isInJSDoc(node) && (!existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(node, getTypeFromTypeNode(node)) || getIntendedTypeFromJSDocTypeReference(node) || unknownSymbol === resolveTypeReferenceName(node, 788968 /* Type */, 
                        /*ignoreErrors*/
                        true))) {
                            return setOriginalNode(typeToTypeNodeHelper(getTypeFromTypeNode(node), context), node);
                        }
                        if (isLiteralImportTypeNode(node)) {
                            const nodeSymbol = getNodeLinks(node).resolvedSymbol;
                            if (isInJSDoc(node) && nodeSymbol && // The import type resolved using jsdoc fallback logic
                                (!node.isTypeOf && !(nodeSymbol.flags & 788968 /* Type */) || // The import type had type arguments autofilled by js fallback logic
                                    !(length(node.typeArguments) >= getMinTypeArgumentCount(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(nodeSymbol))))) {
                                return setOriginalNode(typeToTypeNodeHelper(getTypeFromTypeNode(node), context), node);
                            }
                            return factory.updateImportTypeNode(node, factory.updateLiteralTypeNode(node.argument, rewriteModuleSpecifier(node, node.argument.literal)), node.assertions, node.qualifier, visitNodes2(node.typeArguments, visitExistingNodeTreeSymbols, isTypeNode), node.isTypeOf);
                        }
                        if (isEntityName(node) || isEntityNameExpression(node)) {
                            const { introducesError, node: result } = trackExistingEntityName(node, context, includePrivateSymbol);
                            hadError = hadError || introducesError;
                            if (result !== node) {
                                return result;
                            }
                        }
                        if (file && isTupleTypeNode(node) && getLineAndCharacterOfPosition(file, node.pos).line === getLineAndCharacterOfPosition(file, node.end).line) {
                            setEmitFlags(node, 1 /* SingleLine */);
                        }
                        return visitEachChild(node, visitExistingNodeTreeSymbols, nullTransformationContext);
                        function getEffectiveDotDotDotForParameter(p) {
                            return p.dotDotDotToken || (p.type && isJSDocVariadicType(p.type) ? factory.createToken(25 /* DotDotDotToken */) : void 0);
                        }
                        function getNameForJSDocFunctionParameter(p, index) {
                            return p.name && isIdentifier(p.name) && p.name.escapedText === "this" ? "this" : getEffectiveDotDotDotForParameter(p) ? `args` : `arg${index}`;
                        }
                        function rewriteModuleSpecifier(parent2, lit) {
                            if (bundled) {
                                if (context.tracker && context.tracker.moduleResolverHost) {
                                    const targetFile = getExternalModuleFileFromDeclaration(parent2);
                                    if (targetFile) {
                                        const getCanonicalFileName = createGetCanonicalFileName(!!host.useCaseSensitiveFileNames);
                                        const resolverHost = {
                                            getCanonicalFileName,
                                            getCurrentDirectory: () => context.tracker.moduleResolverHost.getCurrentDirectory(),
                                            getCommonSourceDirectory: () => context.tracker.moduleResolverHost.getCommonSourceDirectory()
                                        };
                                        const newName = getResolvedExternalModuleName(resolverHost, targetFile);
                                        return factory.createStringLiteral(newName);
                                    }
                                }
                            }
                            else {
                                if (context.tracker && context.tracker.trackExternalModuleSymbolOfImportTypeNode) {
                                    const moduleSym = resolveExternalModuleNameWorker(lit, lit, 
                                    /*moduleNotFoundError*/
                                    void 0);
                                    if (moduleSym) {
                                        context.tracker.trackExternalModuleSymbolOfImportTypeNode(moduleSym);
                                    }
                                }
                            }
                            return lit;
                        }
                    }
                    function serializeSymbolWorker(symbol, isPrivate, propertyAsAlias) {
                        var _a2, _b, _c, _d;
                        const symbolName2 = unescapeLeadingUnderscores(symbol.escapedName);
                        const isDefault = symbol.escapedName === "default" /* Default */;
                        if (isPrivate && !(context.flags & 131072 /* AllowAnonymousIdentifier */) && isStringANonContextualKeyword(symbolName2) && !isDefault) {
                            context.encounteredError = true;
                            return;
                        }
                        let needsPostExportDefault = isDefault && !!(symbol.flags & -113 /* ExportDoesNotSupportDefaultModifier */ || symbol.flags & 16 /* Function */ && length(getPropertiesOfType(getTypeOfSymbol(symbol)))) && !(symbol.flags & 2097152 /* Alias */);
                        let needsExportDeclaration = !needsPostExportDefault && !isPrivate && isStringANonContextualKeyword(symbolName2) && !isDefault;
                        if (needsPostExportDefault || needsExportDeclaration) {
                            isPrivate = true;
                        }
                        const modifierFlags = (!isPrivate ? 1 /* Export */ : 0) | (isDefault && !needsPostExportDefault ? 1024 /* Default */ : 0);
                        const isConstMergedWithNS = symbol.flags & 1536 /* Module */ && symbol.flags & (2 /* BlockScopedVariable */ | 1 /* FunctionScopedVariable */ | 4 /* Property */) && symbol.escapedName !== "export=" /* ExportEquals */;
                        const isConstMergedWithNSPrintableAsSignatureMerge = isConstMergedWithNS && isTypeRepresentableAsFunctionNamespaceMerge(getTypeOfSymbol(symbol), symbol);
                        if (symbol.flags & (16 /* Function */ | 8192 /* Method */) || isConstMergedWithNSPrintableAsSignatureMerge) {
                            serializeAsFunctionNamespaceMerge(getTypeOfSymbol(symbol), symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                        }
                        if (symbol.flags & 524288 /* TypeAlias */) {
                            serializeTypeAlias(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & (2 /* BlockScopedVariable */ | 1 /* FunctionScopedVariable */ | 4 /* Property */) && symbol.escapedName !== "export=" /* ExportEquals */ && !(symbol.flags & 4194304 /* Prototype */) && !(symbol.flags & 32 /* Class */) && !(symbol.flags & 8192 /* Method */) && !isConstMergedWithNSPrintableAsSignatureMerge) {
                            if (propertyAsAlias) {
                                const createdExport = serializeMaybeAliasAssignment(symbol);
                                if (createdExport) {
                                    needsExportDeclaration = false;
                                    needsPostExportDefault = false;
                                }
                            }
                            else {
                                const type = getTypeOfSymbol(symbol);
                                const localName = getInternalSymbolName(symbol, symbolName2);
                                if (!(symbol.flags & 16 /* Function */) && isTypeRepresentableAsFunctionNamespaceMerge(type, symbol)) {
                                    serializeAsFunctionNamespaceMerge(type, symbol, localName, modifierFlags);
                                }
                                else {
                                    const flags = !(symbol.flags & 2 /* BlockScopedVariable */) ? ((_a2 = symbol.parent) == null ? void 0 : _a2.valueDeclaration) && isSourceFile((_b = symbol.parent) == null ? void 0 : _b.valueDeclaration) ? 2 /* Const */ : void 0 : isConstVariable(symbol) ? 2 /* Const */ : 1 /* Let */;
                                    const name = needsPostExportDefault || !(symbol.flags & 4 /* Property */) ? localName : getUnusedName(localName, symbol);
                                    let textRange = symbol.declarations && find(symbol.declarations, (d) => isVariableDeclaration(d));
                                    if (textRange && isVariableDeclarationList(textRange.parent) && textRange.parent.declarations.length === 1) {
                                        textRange = textRange.parent.parent;
                                    }
                                    const propertyAccessRequire = (_c = symbol.declarations) == null ? void 0 : _c.find(isPropertyAccessExpression);
                                    if (propertyAccessRequire && isBinaryExpression(propertyAccessRequire.parent) && isIdentifier(propertyAccessRequire.parent.right) && ((_d = type.symbol) == null ? void 0 : _d.valueDeclaration) && isSourceFile(type.symbol.valueDeclaration)) {
                                        const alias = localName === propertyAccessRequire.parent.right.escapedText ? void 0 : propertyAccessRequire.parent.right;
                                        addResult(factory.createExportDeclaration(
                                        /*modifiers*/
                                        void 0, 
                                        /*isTypeOnly*/
                                        false, factory.createNamedExports([factory.createExportSpecifier(
                                            /*isTypeOnly*/
                                            false, alias, localName)])), 0 /* None */);
                                        context.tracker.trackSymbol(type.symbol, context.enclosingDeclaration, 111551 /* Value */);
                                    }
                                    else {
                                        const statement = setTextRange(factory.createVariableStatement(
                                        /*modifiers*/
                                        void 0, factory.createVariableDeclarationList([
                                            factory.createVariableDeclaration(name, 
                                            /*exclamationToken*/
                                            void 0, serializeTypeForDeclaration(context, type, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                                        ], flags)), textRange);
                                        addResult(statement, name !== localName ? modifierFlags & ~1 /* Export */ : modifierFlags);
                                        if (name !== localName && !isPrivate) {
                                            addResult(factory.createExportDeclaration(
                                            /*modifiers*/
                                            void 0, 
                                            /*isTypeOnly*/
                                            false, factory.createNamedExports([factory.createExportSpecifier(
                                                /*isTypeOnly*/
                                                false, name, localName)])), 0 /* None */);
                                            needsExportDeclaration = false;
                                            needsPostExportDefault = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (symbol.flags & 384 /* Enum */) {
                            serializeEnum(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 32 /* Class */) {
                            if (symbol.flags & 4 /* Property */ && symbol.valueDeclaration && isBinaryExpression(symbol.valueDeclaration.parent) && isClassExpression(symbol.valueDeclaration.parent.right)) {
                                serializeAsAlias(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                            }
                            else {
                                serializeAsClass(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                            }
                        }
                        if (symbol.flags & (512 /* ValueModule */ | 1024 /* NamespaceModule */) && (!isConstMergedWithNS || isTypeOnlyNamespace(symbol)) || isConstMergedWithNSPrintableAsSignatureMerge) {
                            serializeModule(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 64 /* Interface */ && !(symbol.flags & 32 /* Class */)) {
                            serializeInterface(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 2097152 /* Alias */) {
                            serializeAsAlias(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                        }
                        if (symbol.flags & 4 /* Property */ && symbol.escapedName === "export=" /* ExportEquals */) {
                            serializeMaybeAliasAssignment(symbol);
                        }
                        if (symbol.flags & 8388608 /* ExportStar */) {
                            if (symbol.declarations) {
                                for (const node of symbol.declarations) {
                                    const resolvedModule = resolveExternalModuleName(node, node.moduleSpecifier);
                                    if (!resolvedModule)
                                        continue;
                                    addResult(factory.createExportDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    node.isTypeOnly, 
                                    /*exportClause*/
                                    void 0, factory.createStringLiteral(getSpecifierForModuleSymbol(resolvedModule, context))), 0 /* None */);
                                }
                            }
                        }
                        if (needsPostExportDefault) {
                            addResult(factory.createExportAssignment(
                            /*modifiers*/
                            void 0, 
                            /*isExportAssignment*/
                            false, factory.createIdentifier(getInternalSymbolName(symbol, symbolName2))), 0 /* None */);
                        }
                        else if (needsExportDeclaration) {
                            addResult(factory.createExportDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*isTypeOnly*/
                            false, factory.createNamedExports([factory.createExportSpecifier(
                                /*isTypeOnly*/
                                false, getInternalSymbolName(symbol, symbolName2), symbolName2)])), 0 /* None */);
                        }
                    }
                    function addResult(node, additionalModifierFlags) {
                        if (canHaveModifiers(node)) {
                            let newModifierFlags = 0 /* None */;
                            const enclosingDeclaration2 = context.enclosingDeclaration && (isJSDocTypeAlias(context.enclosingDeclaration) ? getSourceFileOfNode(context.enclosingDeclaration) : context.enclosingDeclaration);
                            if (additionalModifierFlags & 1 /* Export */ && enclosingDeclaration2 && (isExportingScope(enclosingDeclaration2) || isModuleDeclaration(enclosingDeclaration2)) && canHaveExportModifier(node)) {
                                newModifierFlags |= 1 /* Export */;
                            }
                            if (addingDeclare && !(newModifierFlags & 1 /* Export */) && (!enclosingDeclaration2 || !(enclosingDeclaration2.flags & 16777216 /* Ambient */)) && (isEnumDeclaration(node) || isVariableStatement(node) || isFunctionDeclaration(node) || isClassDeclaration(node) || isModuleDeclaration(node))) {
                                newModifierFlags |= 2 /* Ambient */;
                            }
                            if (additionalModifierFlags & 1024 /* Default */ && (isClassDeclaration(node) || isInterfaceDeclaration(node) || isFunctionDeclaration(node))) {
                                newModifierFlags |= 1024 /* Default */;
                            }
                            if (newModifierFlags) {
                                node = factory.updateModifiers(node, newModifierFlags | getEffectiveModifierFlags(node));
                            }
                        }
                        results.push(node);
                    }
                    function serializeAsAlias(symbol, localName, modifierFlags) {
                        var _a2, _b, _c, _d, _e;
                        const node = getDeclarationOfAliasSymbol(symbol);
                        if (!node)
                            return Debug.fail();
                        const target = getMergedSymbol(getTargetOfAliasDeclaration(node, 
                        /*dontRecursivelyResolve*/
                        true));
                        if (!target) {
                            return;
                        }
                        let verbatimTargetName = isShorthandAmbientModuleSymbol(target) && getSomeTargetNameFromDeclarations(symbol.declarations) || unescapeLeadingUnderscores(target.escapedName);
                        if (verbatimTargetName === "export=" /* ExportEquals */ && allowSyntheticDefaultImports) {
                            verbatimTargetName = "default" /* Default */;
                        }
                        const targetName = getInternalSymbolName(target, verbatimTargetName);
                        includePrivateSymbol(target);
                        switch (node.kind) {
                            case 205 /* BindingElement */:
                                if (((_b = (_a2 = node.parent) == null ? void 0 : _a2.parent) == null ? void 0 : _b.kind) === 257 /* VariableDeclaration */) {
                                    const specifier2 = getSpecifierForModuleSymbol(target.parent || target, context);
                                    const { propertyName } = node;
                                    addResult(factory.createImportDeclaration(
                                    /*modifiers*/
                                    void 0, factory.createImportClause(
                                    /*isTypeOnly*/
                                    false, 
                                    /*name*/
                                    void 0, factory.createNamedImports([factory.createImportSpecifier(
                                        /*isTypeOnly*/
                                        false, propertyName && isIdentifier(propertyName) ? factory.createIdentifier(idText(propertyName)) : void 0, factory.createIdentifier(localName))])), factory.createStringLiteral(specifier2), 
                                    /*importClause*/
                                    void 0), 0 /* None */);
                                    break;
                                }
                                Debug.failBadSyntaxKind(((_c = node.parent) == null ? void 0 : _c.parent) || node, "Unhandled binding element grandparent kind in declaration serialization");
                                break;
                            case 300 /* ShorthandPropertyAssignment */:
                                if (((_e = (_d = node.parent) == null ? void 0 : _d.parent) == null ? void 0 : _e.kind) === 223 /* BinaryExpression */) {
                                    serializeExportSpecifier(unescapeLeadingUnderscores(symbol.escapedName), targetName);
                                }
                                break;
                            case 257 /* VariableDeclaration */:
                                if (isPropertyAccessExpression(node.initializer)) {
                                    const initializer = node.initializer;
                                    const uniqueName = factory.createUniqueName(localName);
                                    const specifier2 = getSpecifierForModuleSymbol(target.parent || target, context);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, uniqueName, factory.createExternalModuleReference(factory.createStringLiteral(specifier2))), 0 /* None */);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createIdentifier(localName), factory.createQualifiedName(uniqueName, initializer.name)), modifierFlags);
                                    break;
                                }
                            case 268 /* ImportEqualsDeclaration */:
                                if (target.escapedName === "export=" /* ExportEquals */ && some(target.declarations, (d) => isSourceFile(d) && isJsonSourceFile(d))) {
                                    serializeMaybeAliasAssignment(symbol);
                                    break;
                                }
                                const isLocalImport = !(target.flags & 512 /* ValueModule */) && !isVariableDeclaration(node);
                                addResult(factory.createImportEqualsDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createIdentifier(localName), isLocalImport ? symbolToName(target, context, 67108863 /* All */, 
                                /*expectsIdentifier*/
                                false) : factory.createExternalModuleReference(factory.createStringLiteral(getSpecifierForModuleSymbol(target, context)))), isLocalImport ? modifierFlags : 0 /* None */);
                                break;
                            case 267 /* NamespaceExportDeclaration */:
                                addResult(factory.createNamespaceExportDeclaration(idText(node.name)), 0 /* None */);
                                break;
                            case 270 /* ImportClause */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, factory.createIdentifier(localName), 
                                /*namedBindings*/
                                void 0), specifier2, node.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 271 /* NamespaceImport */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, 
                                /*importClause*/
                                void 0, factory.createNamespaceImport(factory.createIdentifier(localName))), specifier2, node.parent.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 277 /* NamespaceExport */:
                                addResult(factory.createExportDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createNamespaceExport(factory.createIdentifier(localName)), factory.createStringLiteral(getSpecifierForModuleSymbol(target, context))), 0 /* None */);
                                break;
                            case 273 /* ImportSpecifier */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.parent.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, 
                                /*importClause*/
                                void 0, factory.createNamedImports([
                                    factory.createImportSpecifier(
                                    /*isTypeOnly*/
                                    false, localName !== verbatimTargetName ? factory.createIdentifier(verbatimTargetName) : void 0, factory.createIdentifier(localName))
                                ])), specifier2, node.parent.parent.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 278 /* ExportSpecifier */:
                                const specifier = node.parent.parent.moduleSpecifier;
                                serializeExportSpecifier(unescapeLeadingUnderscores(symbol.escapedName), specifier ? verbatimTargetName : targetName, specifier && isStringLiteralLike(specifier) ? factory.createStringLiteral(specifier.text) : void 0);
                                break;
                            case 274 /* ExportAssignment */:
                                serializeMaybeAliasAssignment(symbol);
                                break;
                            case 223 /* BinaryExpression */:
                            case 208 /* PropertyAccessExpression */:
                            case 209 /* ElementAccessExpression */:
                                if (symbol.escapedName === "default" /* Default */ || symbol.escapedName === "export=" /* ExportEquals */) {
                                    serializeMaybeAliasAssignment(symbol);
                                }
                                else {
                                    serializeExportSpecifier(localName, targetName);
                                }
                                break;
                            default:
                                return Debug.failBadSyntaxKind(node, "Unhandled alias declaration kind in symbol serializer!");
                        }
                    }
                    function serializeMaybeAliasAssignment(symbol) {
                        if (symbol.flags & 4194304 /* Prototype */) {
                            return false;
                        }
                        const name = unescapeLeadingUnderscores(symbol.escapedName);
                        const isExportEquals = name === "export=" /* ExportEquals */;
                        const isDefault = name === "default" /* Default */;
                        const isExportAssignmentCompatibleSymbolName = isExportEquals || isDefault;
                        const aliasDecl = symbol.declarations && getDeclarationOfAliasSymbol(symbol);
                        const target = aliasDecl && getTargetOfAliasDeclaration(aliasDecl, 
                        /*dontRecursivelyResolve*/
                        true);
                        if (target && length(target.declarations) && some(target.declarations, (d) => getSourceFileOfNode(d) === getSourceFileOfNode(enclosingDeclaration))) {
                            const expr = aliasDecl && (isExportAssignment(aliasDecl) || isBinaryExpression(aliasDecl) ? getExportAssignmentExpression(aliasDecl) : getPropertyAssignmentAliasLikeExpression(aliasDecl));
                            const first2 = expr && isEntityNameExpression(expr) ? getFirstNonModuleExportsIdentifier(expr) : void 0;
                            const referenced = first2 && resolveEntityName(first2, 67108863 /* All */, 
                            /*ignoreErrors*/
                            true, 
                            /*dontResolveAlias*/
                            true, enclosingDeclaration);
                            if (referenced || target) {
                                includePrivateSymbol(referenced || target);
                            }
                            const prevDisableTrackSymbol = context.tracker.disableTrackSymbol;
                            context.tracker.disableTrackSymbol = true;
                            if (isExportAssignmentCompatibleSymbolName) {
                                results.push(factory.createExportAssignment(
                                /*modifiers*/
                                void 0, isExportEquals, symbolToExpression(target, context, 67108863 /* All */)));
                            }
                            else {
                                if (first2 === expr && first2) {
                                    serializeExportSpecifier(name, idText(first2));
                                }
                                else if (expr && isClassExpression(expr)) {
                                    serializeExportSpecifier(name, getInternalSymbolName(target, symbolName(target)));
                                }
                                else {
                                    const varName = getUnusedName(name, symbol);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createIdentifier(varName), symbolToName(target, context, 67108863 /* All */, 
                                    /*expectsIdentifier*/
                                    false)), 0 /* None */);
                                    serializeExportSpecifier(name, varName);
                                }
                            }
                            context.tracker.disableTrackSymbol = prevDisableTrackSymbol;
                            return true;
                        }
                        else {
                            const varName = getUnusedName(name, symbol);
                            const typeToSerialize = getWidenedType(getTypeOfSymbol(getMergedSymbol(symbol)));
                            if (isTypeRepresentableAsFunctionNamespaceMerge(typeToSerialize, symbol)) {
                                serializeAsFunctionNamespaceMerge(typeToSerialize, symbol, varName, isExportAssignmentCompatibleSymbolName ? 0 /* None */ : 1 /* Export */);
                            }
                            else {
                                const statement = factory.createVariableStatement(
                                /*modifiers*/
                                void 0, factory.createVariableDeclarationList([
                                    factory.createVariableDeclaration(varName, 
                                    /*exclamationToken*/
                                    void 0, serializeTypeForDeclaration(context, typeToSerialize, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                                ], 2 /* Const */));
                                addResult(statement, target && target.flags & 4 /* Property */ && target.escapedName === "export=" /* ExportEquals */ ? 2 /* Ambient */ : name === varName ? 1 /* Export */ : 0 /* None */);
                            }
                            if (isExportAssignmentCompatibleSymbolName) {
                                results.push(factory.createExportAssignment(
                                /*modifiers*/
                                void 0, isExportEquals, factory.createIdentifier(varName)));
                                return true;
                            }
                            else if (name !== varName) {
                                serializeExportSpecifier(name, varName);
                                return true;
                            }
                            return false;
                        }
                    }
                        return function serializePropertySymbol(p, isStatic2, baseType) {
                            var _a2, _b, _c, _d, _e;
                            const modifierFlags = getDeclarationModifierFlagsFromSymbol(p);
                            const isPrivate = !!(modifierFlags & 8 /* Private */);
                            if (isStatic2 && p.flags & (788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */)) {
                                return [];
                            }
                            if (p.flags & 4194304 /* Prototype */ || baseType && getPropertyOfType(baseType, p.escapedName) && isReadonlySymbol(getPropertyOfType(baseType, p.escapedName)) === isReadonlySymbol(p) && (p.flags & 16777216 /* Optional */) === (getPropertyOfType(baseType, p.escapedName).flags & 16777216 /* Optional */) && isTypeIdenticalTo(getTypeOfSymbol(p), getTypeOfPropertyOfType(baseType, p.escapedName))) {
                                return [];
                            }
                            const flag = modifierFlags & ~512 /* Async */ | (isStatic2 ? 32 /* Static */ : 0);
                            const name = getPropertyNameNodeForSymbol(p, context);
                            const firstPropertyLikeDecl = (_a2 = p.declarations) == null ? void 0 : _a2.find(or(isPropertyDeclaration, isAccessor, isVariableDeclaration, isPropertySignature, isBinaryExpression, isPropertyAccessExpression));
                            if (p.flags & 98304 /* Accessor */ && useAccessors) {
                                const result = [];
                                if (p.flags & 65536 /* SetAccessor */) {
                                    result.push(setTextRange(factory.createSetAccessorDeclaration(factory.createModifiersFromModifierFlags(flag), name, [factory.createParameterDeclaration(
                                        /*modifiers*/
                                        void 0, 
                                        /*dotDotDotToken*/
                                        void 0, "arg", 
                                        /*questionToken*/
                                        void 0, isPrivate ? void 0 : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled))], 
                                    /*body*/
                                    void 0), ((_b = p.declarations) == null ? void 0 : _b.find(isSetAccessor)) || firstPropertyLikeDecl));
                                }
                                if (p.flags & 32768 /* GetAccessor */) {
                                    const isPrivate2 = modifierFlags & 8 /* Private */;
                                    result.push(setTextRange(factory.createGetAccessorDeclaration(factory.createModifiersFromModifierFlags(flag), name, [], isPrivate2 ? void 0 : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled), 
                                    /*body*/
                                    void 0), ((_c = p.declarations) == null ? void 0 : _c.find(isGetAccessor)) || firstPropertyLikeDecl));
                                }
                                return result;
                            }
                            else if (p.flags & (4 /* Property */ | 3 /* Variable */ | 98304 /* Accessor */)) {
                                return setTextRange(createProperty2(factory.createModifiersFromModifierFlags((isReadonlySymbol(p) ? 64 /* Readonly */ : 0) | flag), name, p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, isPrivate ? void 0 : serializeTypeForDeclaration(context, getWriteTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled), 
                                // TODO: https://github.com/microsoft/TypeScript/pull/32372#discussion_r328386357
                                // interface members can't have initializers, however class members _can_
                                /*initializer*/
                                void 0), ((_d = p.declarations) == null ? void 0 : _d.find(or(isPropertyDeclaration, isVariableDeclaration))) || firstPropertyLikeDecl);
                            }
                            if (p.flags & (8192 /* Method */ | 16 /* Function */)) {
                                const type = getTypeOfSymbol(p);
                                const signatures = getSignaturesOfType(type, 0 /* Call */);
                                if (flag & 8 /* Private */) {
                                    return setTextRange(createProperty2(factory.createModifiersFromModifierFlags((isReadonlySymbol(p) ? 64 /* Readonly */ : 0) | flag), name, p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, 
                                    /*type*/
                                    void 0, 
                                    /*initializer*/
                                    void 0), ((_e = p.declarations) == null ? void 0 : _e.find(isFunctionLikeDeclaration)) || signatures[0] && signatures[0].declaration || p.declarations && p.declarations[0]);
                                }
                                const results2 = [];
                                for (const sig of signatures) {
                                    const decl = signatureToSignatureDeclarationHelper(sig, methodKind, context, {
                                        name,
                                        questionToken: p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0,
                                        modifiers: flag ? factory.createModifiersFromModifierFlags(flag) : void 0
                                    });
                                    const location = sig.declaration && isPrototypePropertyAssignment(sig.declaration.parent) ? sig.declaration.parent : sig.declaration;
                                    results2.push(setTextRange(decl, location));
                                }
                                return results2;
                            }
                            return Debug.fail(`Unhandled class member kind! ${p.__debugFlags || p.flags}`);
                        };