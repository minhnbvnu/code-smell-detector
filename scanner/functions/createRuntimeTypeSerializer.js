function createRuntimeTypeSerializer(context) {
            const { hoistVariableDeclaration } = context;
            const resolver = context.getEmitResolver();
            const compilerOptions = context.getCompilerOptions();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const strictNullChecks = getStrictOptionValue(compilerOptions, "strictNullChecks");
            let currentLexicalScope;
            let currentNameScope;
            return {
                serializeTypeNode: (serializerContext, node) => setSerializerContextAnd(serializerContext, serializeTypeNode, node),
                serializeTypeOfNode: (serializerContext, node) => setSerializerContextAnd(serializerContext, serializeTypeOfNode, node),
                serializeParameterTypesOfNode: (serializerContext, node, container) => setSerializerContextAnd(serializerContext, serializeParameterTypesOfNode, node, container),
                serializeReturnTypeOfNode: (serializerContext, node) => setSerializerContextAnd(serializerContext, serializeReturnTypeOfNode, node)
            };
            function setSerializerContextAnd(serializerContext, cb, node, arg) {
                const savedCurrentLexicalScope = currentLexicalScope;
                const savedCurrentNameScope = currentNameScope;
                currentLexicalScope = serializerContext.currentLexicalScope;
                currentNameScope = serializerContext.currentNameScope;
                const result = arg === void 0 ? cb(node) : cb(node, arg);
                currentLexicalScope = savedCurrentLexicalScope;
                currentNameScope = savedCurrentNameScope;
                return result;
            }
            function getAccessorTypeNode(node) {
                const accessors = resolver.getAllAccessorDeclarations(node);
                return accessors.setAccessor && getSetAccessorTypeAnnotationNode(accessors.setAccessor) || accessors.getAccessor && getEffectiveReturnTypeNode(accessors.getAccessor);
            }
            function serializeTypeOfNode(node) {
                switch (node.kind) {
                    case 169 /* PropertyDeclaration */:
                    case 166 /* Parameter */:
                        return serializeTypeNode(node.type);
                    case 175 /* SetAccessor */:
                    case 174 /* GetAccessor */:
                        return serializeTypeNode(getAccessorTypeNode(node));
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                    case 171 /* MethodDeclaration */:
                        return factory.createIdentifier("Function");
                    default:
                        return factory.createVoidZero();
                }
            }
            function serializeParameterTypesOfNode(node, container) {
                const valueDeclaration = isClassLike(node) ? getFirstConstructorWithBody(node) : isFunctionLike(node) && nodeIsPresent(node.body) ? node : void 0;
                const expressions = [];
                if (valueDeclaration) {
                    const parameters = getParametersOfDecoratedDeclaration(valueDeclaration, container);
                    const numParameters = parameters.length;
                    for (let i = 0; i < numParameters; i++) {
                        const parameter = parameters[i];
                        if (i === 0 && isIdentifier(parameter.name) && parameter.name.escapedText === "this") {
                            continue;
                        }
                        if (parameter.dotDotDotToken) {
                            expressions.push(serializeTypeNode(getRestParameterElementType(parameter.type)));
                        }
                        else {
                            expressions.push(serializeTypeOfNode(parameter));
                        }
                    }
                }
                return factory.createArrayLiteralExpression(expressions);
            }
            function getParametersOfDecoratedDeclaration(node, container) {
                if (container && node.kind === 174 /* GetAccessor */) {
                    const { setAccessor } = getAllAccessorDeclarations(container.members, node);
                    if (setAccessor) {
                        return setAccessor.parameters;
                    }
                }
                return node.parameters;
            }
            function serializeReturnTypeOfNode(node) {
                if (isFunctionLike(node) && node.type) {
                    return serializeTypeNode(node.type);
                }
                else if (isAsyncFunction(node)) {
                    return factory.createIdentifier("Promise");
                }
                return factory.createVoidZero();
            }
            function serializeTypeNode(node) {
                if (node === void 0) {
                    return factory.createIdentifier("Object");
                }
                node = skipTypeParentheses(node);
                switch (node.kind) {
                    case 114 /* VoidKeyword */:
                    case 155 /* UndefinedKeyword */:
                    case 144 /* NeverKeyword */:
                        return factory.createVoidZero();
                    case 181 /* FunctionType */:
                    case 182 /* ConstructorType */:
                        return factory.createIdentifier("Function");
                    case 185 /* ArrayType */:
                    case 186 /* TupleType */:
                        return factory.createIdentifier("Array");
                    case 179 /* TypePredicate */:
                        return node.assertsModifier ? factory.createVoidZero() : factory.createIdentifier("Boolean");
                    case 134 /* BooleanKeyword */:
                        return factory.createIdentifier("Boolean");
                    case 200 /* TemplateLiteralType */:
                    case 152 /* StringKeyword */:
                        return factory.createIdentifier("String");
                    case 149 /* ObjectKeyword */:
                        return factory.createIdentifier("Object");
                    case 198 /* LiteralType */:
                        return serializeLiteralOfLiteralTypeNode(node.literal);
                    case 148 /* NumberKeyword */:
                        return factory.createIdentifier("Number");
                    case 160 /* BigIntKeyword */:
                        return getGlobalConstructor("BigInt", 7 /* ES2020 */);
                    case 153 /* SymbolKeyword */:
                        return getGlobalConstructor("Symbol", 2 /* ES2015 */);
                    case 180 /* TypeReference */:
                        return serializeTypeReferenceNode(node);
                    case 190 /* IntersectionType */:
                        return serializeUnionOrIntersectionConstituents(node.types, 
                        /*isIntersection*/
                        true);
                    case 189 /* UnionType */:
                        return serializeUnionOrIntersectionConstituents(node.types, 
                        /*isIntersection*/
                        false);
                    case 191 /* ConditionalType */:
                        return serializeUnionOrIntersectionConstituents([node.trueType, node.falseType], 
                        /*isIntersection*/
                        false);
                    case 195 /* TypeOperator */:
                        if (node.operator === 146 /* ReadonlyKeyword */) {
                            return serializeTypeNode(node.type);
                        }
                        break;
                    case 183 /* TypeQuery */:
                    case 196 /* IndexedAccessType */:
                    case 197 /* MappedType */:
                    case 184 /* TypeLiteral */:
                    case 131 /* AnyKeyword */:
                    case 157 /* UnknownKeyword */:
                    case 194 /* ThisType */:
                    case 202 /* ImportType */:
                        break;
                    case 315 /* JSDocAllType */:
                    case 316 /* JSDocUnknownType */:
                    case 320 /* JSDocFunctionType */:
                    case 321 /* JSDocVariadicType */:
                    case 322 /* JSDocNamepathType */:
                        break;
                    case 317 /* JSDocNullableType */:
                    case 318 /* JSDocNonNullableType */:
                    case 319 /* JSDocOptionalType */:
                        return serializeTypeNode(node.type);
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
                return factory.createIdentifier("Object");
            }
            function serializeLiteralOfLiteralTypeNode(node) {
                switch (node.kind) {
                    case 10 /* StringLiteral */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                        return factory.createIdentifier("String");
                    case 221 /* PrefixUnaryExpression */: {
                        const operand = node.operand;
                        switch (operand.kind) {
                            case 8 /* NumericLiteral */:
                            case 9 /* BigIntLiteral */:
                                return serializeLiteralOfLiteralTypeNode(operand);
                            default:
                                return Debug.failBadSyntaxKind(operand);
                        }
                    }
                    case 8 /* NumericLiteral */:
                        return factory.createIdentifier("Number");
                    case 9 /* BigIntLiteral */:
                        return getGlobalConstructor("BigInt", 7 /* ES2020 */);
                    case 110 /* TrueKeyword */:
                    case 95 /* FalseKeyword */:
                        return factory.createIdentifier("Boolean");
                    case 104 /* NullKeyword */:
                        return factory.createVoidZero();
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }
            function serializeUnionOrIntersectionConstituents(types, isIntersection) {
                let serializedType;
                for (let typeNode of types) {
                    typeNode = skipTypeParentheses(typeNode);
                    if (typeNode.kind === 144 /* NeverKeyword */) {
                        if (isIntersection)
                            return factory.createVoidZero();
                        continue;
                    }
                    if (typeNode.kind === 157 /* UnknownKeyword */) {
                        if (!isIntersection)
                            return factory.createIdentifier("Object");
                        continue;
                    }
                    if (typeNode.kind === 131 /* AnyKeyword */) {
                        return factory.createIdentifier("Object");
                    }
                    if (!strictNullChecks && (isLiteralTypeNode(typeNode) && typeNode.literal.kind === 104 /* NullKeyword */ || typeNode.kind === 155 /* UndefinedKeyword */)) {
                        continue;
                    }
                    const serializedConstituent = serializeTypeNode(typeNode);
                    if (isIdentifier(serializedConstituent) && serializedConstituent.escapedText === "Object") {
                        return serializedConstituent;
                    }
                    if (serializedType) {
                        if (!equateSerializedTypeNodes(serializedType, serializedConstituent)) {
                            return factory.createIdentifier("Object");
                        }
                    }
                    else {
                        serializedType = serializedConstituent;
                    }
                }
                return serializedType != null ? serializedType : factory.createVoidZero();
            }
            function equateSerializedTypeNodes(left, right) {
                return (
                // temp vars used in fallback
                isGeneratedIdentifier(left) ? isGeneratedIdentifier(right) : (
                // entity names
                isIdentifier(left) ? isIdentifier(right) && left.escapedText === right.escapedText : isPropertyAccessExpression(left) ? isPropertyAccessExpression(right) && equateSerializedTypeNodes(left.expression, right.expression) && equateSerializedTypeNodes(left.name, right.name) : (
                // `void 0`
                isVoidExpression(left) ? isVoidExpression(right) && isNumericLiteral(left.expression) && left.expression.text === "0" && isNumericLiteral(right.expression) && right.expression.text === "0" : (
                // `"undefined"` or `"function"` in `typeof` checks
                isStringLiteral(left) ? isStringLiteral(right) && left.text === right.text : (
                // used in `typeof` checks for fallback
                isTypeOfExpression(left) ? isTypeOfExpression(right) && equateSerializedTypeNodes(left.expression, right.expression) : (
                // parens in `typeof` checks with temps
                isParenthesizedExpression(left) ? isParenthesizedExpression(right) && equateSerializedTypeNodes(left.expression, right.expression) : (
                // conditionals used in fallback
                isConditionalExpression(left) ? isConditionalExpression(right) && equateSerializedTypeNodes(left.condition, right.condition) && equateSerializedTypeNodes(left.whenTrue, right.whenTrue) && equateSerializedTypeNodes(left.whenFalse, right.whenFalse) : (
                // logical binary and assignments used in fallback
                isBinaryExpression(left) ? isBinaryExpression(right) && left.operatorToken.kind === right.operatorToken.kind && equateSerializedTypeNodes(left.left, right.left) && equateSerializedTypeNodes(left.right, right.right) : false))))))));
            }
            function serializeTypeReferenceNode(node) {
                const kind = resolver.getTypeReferenceSerializationKind(node.typeName, currentNameScope != null ? currentNameScope : currentLexicalScope);
                switch (kind) {
                    case 0 /* Unknown */:
                        if (findAncestor(node, (n) => n.parent && isConditionalTypeNode(n.parent) && (n.parent.trueType === n || n.parent.falseType === n))) {
                            return factory.createIdentifier("Object");
                        }
                        const serialized = serializeEntityNameAsExpressionFallback(node.typeName);
                        const temp = factory.createTempVariable(hoistVariableDeclaration);
                        return factory.createConditionalExpression(factory.createTypeCheck(factory.createAssignment(temp, serialized), "function"), 
                        /*questionToken*/
                        void 0, temp, 
                        /*colonToken*/
                        void 0, factory.createIdentifier("Object"));
                    case 1 /* TypeWithConstructSignatureAndValue */:
                        return serializeEntityNameAsExpression(node.typeName);
                    case 2 /* VoidNullableOrNeverType */:
                        return factory.createVoidZero();
                    case 4 /* BigIntLikeType */:
                        return getGlobalConstructor("BigInt", 7 /* ES2020 */);
                    case 6 /* BooleanType */:
                        return factory.createIdentifier("Boolean");
                    case 3 /* NumberLikeType */:
                        return factory.createIdentifier("Number");
                    case 5 /* StringLikeType */:
                        return factory.createIdentifier("String");
                    case 7 /* ArrayLikeType */:
                        return factory.createIdentifier("Array");
                    case 8 /* ESSymbolType */:
                        return getGlobalConstructor("Symbol", 2 /* ES2015 */);
                    case 10 /* TypeWithCallSignature */:
                        return factory.createIdentifier("Function");
                    case 9 /* Promise */:
                        return factory.createIdentifier("Promise");
                    case 11 /* ObjectType */:
                        return factory.createIdentifier("Object");
                    default:
                        return Debug.assertNever(kind);
                }
            }
            function createCheckedValue(left, right) {
                return factory.createLogicalAnd(factory.createStrictInequality(factory.createTypeOfExpression(left), factory.createStringLiteral("undefined")), right);
            }
            function serializeEntityNameAsExpressionFallback(node) {
                if (node.kind === 79 /* Identifier */) {
                    const copied = serializeEntityNameAsExpression(node);
                    return createCheckedValue(copied, copied);
                }
                if (node.left.kind === 79 /* Identifier */) {
                    return createCheckedValue(serializeEntityNameAsExpression(node.left), serializeEntityNameAsExpression(node));
                }
                const left = serializeEntityNameAsExpressionFallback(node.left);
                const temp = factory.createTempVariable(hoistVariableDeclaration);
                return factory.createLogicalAnd(factory.createLogicalAnd(left.left, factory.createStrictInequality(factory.createAssignment(temp, left.right), factory.createVoidZero())), factory.createPropertyAccessExpression(temp, node.right));
            }
            function serializeEntityNameAsExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        const name = setParent(setTextRange(parseNodeFactory.cloneNode(node), node), node.parent);
                        name.original = void 0;
                        setParent(name, getParseTreeNode(currentLexicalScope));
                        return name;
                    case 163 /* QualifiedName */:
                        return serializeQualifiedNameAsExpression(node);
                }
            }
            function serializeQualifiedNameAsExpression(node) {
                return factory.createPropertyAccessExpression(serializeEntityNameAsExpression(node.left), node.right);
            }
            function getGlobalConstructorWithFallback(name) {
                return factory.createConditionalExpression(factory.createTypeCheck(factory.createIdentifier(name), "function"), 
                /*questionToken*/
                void 0, factory.createIdentifier(name), 
                /*colonToken*/
                void 0, factory.createIdentifier("Object"));
            }
            function getGlobalConstructor(name, minLanguageVersion) {
                return languageVersion < minLanguageVersion ? getGlobalConstructorWithFallback(name) : factory.createIdentifier(name);
            }
        }