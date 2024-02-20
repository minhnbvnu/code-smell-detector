function transformJsx(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers } = context;
            const compilerOptions = context.getCompilerOptions();
            let currentSourceFile;
            let currentFileState;
            return chainBundle(context, transformSourceFile);
            function getCurrentFileNameExpression() {
                if (currentFileState.filenameDeclaration) {
                    return currentFileState.filenameDeclaration.name;
                }
                const declaration = factory2.createVariableDeclaration(factory2.createUniqueName("_jsxFileName", 16 /* Optimistic */ | 32 /* FileLevel */), 
                /*exclaimationToken*/
                void 0, 
                /*type*/
                void 0, factory2.createStringLiteral(currentSourceFile.fileName));
                currentFileState.filenameDeclaration = declaration;
                return currentFileState.filenameDeclaration.name;
            }
            function getJsxFactoryCalleePrimitive(isStaticChildren) {
                return compilerOptions.jsx === 5 /* ReactJSXDev */ ? "jsxDEV" : isStaticChildren ? "jsxs" : "jsx";
            }
            function getJsxFactoryCallee(isStaticChildren) {
                const type = getJsxFactoryCalleePrimitive(isStaticChildren);
                return getImplicitImportForName(type);
            }
            function getImplicitJsxFragmentReference() {
                return getImplicitImportForName("Fragment");
            }
            function getImplicitImportForName(name) {
                var _a2, _b;
                const importSource = name === "createElement" ? currentFileState.importSpecifier : getJSXRuntimeImport(currentFileState.importSpecifier, compilerOptions);
                const existing = (_b = (_a2 = currentFileState.utilizedImplicitRuntimeImports) == null ? void 0 : _a2.get(importSource)) == null ? void 0 : _b.get(name);
                if (existing) {
                    return existing.name;
                }
                if (!currentFileState.utilizedImplicitRuntimeImports) {
                    currentFileState.utilizedImplicitRuntimeImports = /* @__PURE__ */ new Map();
                }
                let specifierSourceImports = currentFileState.utilizedImplicitRuntimeImports.get(importSource);
                if (!specifierSourceImports) {
                    specifierSourceImports = /* @__PURE__ */ new Map();
                    currentFileState.utilizedImplicitRuntimeImports.set(importSource, specifierSourceImports);
                }
                const generatedName = factory2.createUniqueName(`_${name}`, 16 /* Optimistic */ | 32 /* FileLevel */ | 64 /* AllowNameSubstitution */);
                const specifier = factory2.createImportSpecifier(
                /*isTypeOnly*/
                false, factory2.createIdentifier(name), generatedName);
                setIdentifierGeneratedImportReference(generatedName, specifier);
                specifierSourceImports.set(name, specifier);
                return generatedName;
            }
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                currentSourceFile = node;
                currentFileState = {};
                currentFileState.importSpecifier = getJSXImplicitImportBase(compilerOptions, node);
                let visited = visitEachChild(node, visitor, context);
                addEmitHelpers(visited, context.readEmitHelpers());
                let statements = visited.statements;
                if (currentFileState.filenameDeclaration) {
                    statements = insertStatementAfterCustomPrologue(statements.slice(), factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([currentFileState.filenameDeclaration], 2 /* Const */)));
                }
                if (currentFileState.utilizedImplicitRuntimeImports) {
                    for (const [importSource, importSpecifiersMap] of arrayFrom(currentFileState.utilizedImplicitRuntimeImports.entries())) {
                        if (isExternalModule(node)) {
                            const importStatement = factory2.createImportDeclaration(
                            /*modifiers*/
                            void 0, factory2.createImportClause(
                            /*typeOnly*/
                            false, 
                            /*name*/
                            void 0, factory2.createNamedImports(arrayFrom(importSpecifiersMap.values()))), factory2.createStringLiteral(importSource), 
                            /*assertClause*/
                            void 0);
                            setParentRecursive(importStatement, 
                            /*incremental*/
                            false);
                            statements = insertStatementAfterCustomPrologue(statements.slice(), importStatement);
                        }
                        else if (isExternalOrCommonJsModule(node)) {
                            const requireStatement = factory2.createVariableStatement(
                            /*modifiers*/
                            void 0, factory2.createVariableDeclarationList([
                                factory2.createVariableDeclaration(factory2.createObjectBindingPattern(arrayFrom(importSpecifiersMap.values(), (s) => factory2.createBindingElement(
                                /*dotdotdot*/
                                void 0, s.propertyName, s.name))), 
                                /*exclaimationToken*/
                                void 0, 
                                /*type*/
                                void 0, factory2.createCallExpression(factory2.createIdentifier("require"), 
                                /*typeArguments*/
                                void 0, [factory2.createStringLiteral(importSource)]))
                            ], 2 /* Const */));
                            setParentRecursive(requireStatement, 
                            /*incremental*/
                            false);
                            statements = insertStatementAfterCustomPrologue(statements.slice(), requireStatement);
                        }
                        else {
                        }
                    }
                }
                if (statements !== visited.statements) {
                    visited = factory2.updateSourceFile(visited, statements);
                }
                currentFileState = void 0;
                return visited;
            }
            function visitor(node) {
                if (node.transformFlags & 2 /* ContainsJsx */) {
                    return visitorWorker(node);
                }
                else {
                    return node;
                }
            }
            function visitorWorker(node) {
                switch (node.kind) {
                    case 281 /* JsxElement */:
                        return visitJsxElement(node, 
                        /*isChild*/
                        false);
                    case 282 /* JsxSelfClosingElement */:
                        return visitJsxSelfClosingElement(node, 
                        /*isChild*/
                        false);
                    case 285 /* JsxFragment */:
                        return visitJsxFragment(node, 
                        /*isChild*/
                        false);
                    case 291 /* JsxExpression */:
                        return visitJsxExpression(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function transformJsxChildToExpression(node) {
                switch (node.kind) {
                    case 11 /* JsxText */:
                        return visitJsxText(node);
                    case 291 /* JsxExpression */:
                        return visitJsxExpression(node);
                    case 281 /* JsxElement */:
                        return visitJsxElement(node, 
                        /*isChild*/
                        true);
                    case 282 /* JsxSelfClosingElement */:
                        return visitJsxSelfClosingElement(node, 
                        /*isChild*/
                        true);
                    case 285 /* JsxFragment */:
                        return visitJsxFragment(node, 
                        /*isChild*/
                        true);
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }
            function hasKeyAfterPropsSpread(node) {
                let spread = false;
                for (const elem of node.attributes.properties) {
                    if (isJsxSpreadAttribute(elem)) {
                        spread = true;
                    }
                    else if (spread && isJsxAttribute(elem) && elem.name.escapedText === "key") {
                        return true;
                    }
                }
                return false;
            }
            function shouldUseCreateElement(node) {
                return currentFileState.importSpecifier === void 0 || hasKeyAfterPropsSpread(node);
            }
            function visitJsxElement(node, isChild) {
                const tagTransform = shouldUseCreateElement(node.openingElement) ? visitJsxOpeningLikeElementCreateElement : visitJsxOpeningLikeElementJSX;
                return tagTransform(node.openingElement, node.children, isChild, 
                /*location*/
                node);
            }
            function visitJsxSelfClosingElement(node, isChild) {
                const tagTransform = shouldUseCreateElement(node) ? visitJsxOpeningLikeElementCreateElement : visitJsxOpeningLikeElementJSX;
                return tagTransform(node, 
                /*children*/
                void 0, isChild, 
                /*location*/
                node);
            }
            function visitJsxFragment(node, isChild) {
                const tagTransform = currentFileState.importSpecifier === void 0 ? visitJsxOpeningFragmentCreateElement : visitJsxOpeningFragmentJSX;
                return tagTransform(node.openingFragment, node.children, isChild, 
                /*location*/
                node);
            }
            function convertJsxChildrenToChildrenPropObject(children) {
                const prop = convertJsxChildrenToChildrenPropAssignment(children);
                return prop && factory2.createObjectLiteralExpression([prop]);
            }
            function convertJsxChildrenToChildrenPropAssignment(children) {
                const nonWhitespaceChildren = getSemanticJsxChildren(children);
                if (length(nonWhitespaceChildren) === 1 && !nonWhitespaceChildren[0].dotDotDotToken) {
                    const result2 = transformJsxChildToExpression(nonWhitespaceChildren[0]);
                    return result2 && factory2.createPropertyAssignment("children", result2);
                }
                const result = mapDefined(children, transformJsxChildToExpression);
                return length(result) ? factory2.createPropertyAssignment("children", factory2.createArrayLiteralExpression(result)) : void 0;
            }
            function visitJsxOpeningLikeElementJSX(node, children, isChild, location) {
                const tagName = getTagName(node);
                const childrenProp = children && children.length ? convertJsxChildrenToChildrenPropAssignment(children) : void 0;
                const keyAttr = find(node.attributes.properties, (p) => !!p.name && isIdentifier(p.name) && p.name.escapedText === "key");
                const attrs = keyAttr ? filter(node.attributes.properties, (p) => p !== keyAttr) : node.attributes.properties;
                const objectProperties = length(attrs) ? transformJsxAttributesToObjectProps(attrs, childrenProp) : factory2.createObjectLiteralExpression(childrenProp ? [childrenProp] : emptyArray);
                return visitJsxOpeningLikeElementOrFragmentJSX(tagName, objectProperties, keyAttr, children || emptyArray, isChild, location);
            }
            function visitJsxOpeningLikeElementOrFragmentJSX(tagName, objectProperties, keyAttr, children, isChild, location) {
                var _a2;
                const nonWhitespaceChildren = getSemanticJsxChildren(children);
                const isStaticChildren = length(nonWhitespaceChildren) > 1 || !!((_a2 = nonWhitespaceChildren[0]) == null ? void 0 : _a2.dotDotDotToken);
                const args = [tagName, objectProperties];
                if (keyAttr) {
                    args.push(transformJsxAttributeInitializer(keyAttr.initializer));
                }
                if (compilerOptions.jsx === 5 /* ReactJSXDev */) {
                    const originalFile = getOriginalNode(currentSourceFile);
                    if (originalFile && isSourceFile(originalFile)) {
                        if (keyAttr === void 0) {
                            args.push(factory2.createVoidZero());
                        }
                        args.push(isStaticChildren ? factory2.createTrue() : factory2.createFalse());
                        const lineCol = getLineAndCharacterOfPosition(originalFile, location.pos);
                        args.push(factory2.createObjectLiteralExpression([
                            factory2.createPropertyAssignment("fileName", getCurrentFileNameExpression()),
                            factory2.createPropertyAssignment("lineNumber", factory2.createNumericLiteral(lineCol.line + 1)),
                            factory2.createPropertyAssignment("columnNumber", factory2.createNumericLiteral(lineCol.character + 1))
                        ]));
                        args.push(factory2.createThis());
                    }
                }
                const element = setTextRange(factory2.createCallExpression(getJsxFactoryCallee(isStaticChildren), 
                /*typeArguments*/
                void 0, args), location);
                if (isChild) {
                    startOnNewLine(element);
                }
                return element;
            }
            function visitJsxOpeningLikeElementCreateElement(node, children, isChild, location) {
                const tagName = getTagName(node);
                const attrs = node.attributes.properties;
                const objectProperties = length(attrs) ? transformJsxAttributesToObjectProps(attrs) : factory2.createNull();
                const callee = currentFileState.importSpecifier === void 0 ? createJsxFactoryExpression(factory2, context.getEmitResolver().getJsxFactoryEntity(currentSourceFile), compilerOptions.reactNamespace, 
                // TODO: GH#18217
                node) : getImplicitImportForName("createElement");
                const element = createExpressionForJsxElement(factory2, callee, tagName, objectProperties, mapDefined(children, transformJsxChildToExpression), location);
                if (isChild) {
                    startOnNewLine(element);
                }
                return element;
            }
            function visitJsxOpeningFragmentJSX(_node, children, isChild, location) {
                let childrenProps;
                if (children && children.length) {
                    const result = convertJsxChildrenToChildrenPropObject(children);
                    if (result) {
                        childrenProps = result;
                    }
                }
                return visitJsxOpeningLikeElementOrFragmentJSX(getImplicitJsxFragmentReference(), childrenProps || factory2.createObjectLiteralExpression([]), 
                /*keyAttr*/
                void 0, children, isChild, location);
            }
            function visitJsxOpeningFragmentCreateElement(node, children, isChild, location) {
                const element = createExpressionForJsxFragment(factory2, context.getEmitResolver().getJsxFactoryEntity(currentSourceFile), context.getEmitResolver().getJsxFragmentFactoryEntity(currentSourceFile), compilerOptions.reactNamespace, 
                // TODO: GH#18217
                mapDefined(children, transformJsxChildToExpression), node, location);
                if (isChild) {
                    startOnNewLine(element);
                }
                return element;
            }
            function transformJsxSpreadAttributeToSpreadAssignment(node) {
                return factory2.createSpreadAssignment(Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
            }
            function transformJsxAttributesToObjectProps(attrs, children) {
                const target = getEmitScriptTarget(compilerOptions);
                return target && target >= 5 /* ES2018 */ ? factory2.createObjectLiteralExpression(transformJsxAttributesToProps(attrs, children)) : transformJsxAttributesToExpression(attrs, children);
            }
            function transformJsxAttributesToProps(attrs, children) {
                const props = flatten(spanMap(attrs, isJsxSpreadAttribute, (attrs2, isSpread) => map(attrs2, (attr) => isSpread ? transformJsxSpreadAttributeToSpreadAssignment(attr) : transformJsxAttributeToObjectLiteralElement(attr))));
                if (children) {
                    props.push(children);
                }
                return props;
            }
            function transformJsxAttributesToExpression(attrs, children) {
                const expressions = flatten(spanMap(attrs, isJsxSpreadAttribute, (attrs2, isSpread) => isSpread ? map(attrs2, transformJsxSpreadAttributeToExpression) : factory2.createObjectLiteralExpression(map(attrs2, transformJsxAttributeToObjectLiteralElement))));
                if (isJsxSpreadAttribute(attrs[0])) {
                    expressions.unshift(factory2.createObjectLiteralExpression());
                }
                if (children) {
                    expressions.push(factory2.createObjectLiteralExpression([children]));
                }
                return singleOrUndefined(expressions) || emitHelpers().createAssignHelper(expressions);
            }
            function transformJsxSpreadAttributeToExpression(node) {
                return Debug.checkDefined(visitNode(node.expression, visitor, isExpression));
            }
            function transformJsxAttributeToObjectLiteralElement(node) {
                const name = getAttributeName(node);
                const expression = transformJsxAttributeInitializer(node.initializer);
                return factory2.createPropertyAssignment(name, expression);
            }
            function transformJsxAttributeInitializer(node) {
                if (node === void 0) {
                    return factory2.createTrue();
                }
                if (node.kind === 10 /* StringLiteral */) {
                    const singleQuote = node.singleQuote !== void 0 ? node.singleQuote : !isStringDoubleQuoted(node, currentSourceFile);
                    const literal = factory2.createStringLiteral(tryDecodeEntities(node.text) || node.text, singleQuote);
                    return setTextRange(literal, node);
                }
                if (node.kind === 291 /* JsxExpression */) {
                    if (node.expression === void 0) {
                        return factory2.createTrue();
                    }
                    return Debug.checkDefined(visitNode(node.expression, visitor, isExpression));
                }
                if (isJsxElement(node)) {
                    return visitJsxElement(node, 
                    /*isChild*/
                    false);
                }
                if (isJsxSelfClosingElement(node)) {
                    return visitJsxSelfClosingElement(node, 
                    /*isChild*/
                    false);
                }
                if (isJsxFragment(node)) {
                    return visitJsxFragment(node, 
                    /*isChild*/
                    false);
                }
                return Debug.failBadSyntaxKind(node);
            }
            function visitJsxText(node) {
                const fixed = fixupWhitespaceAndDecodeEntities(node.text);
                return fixed === void 0 ? void 0 : factory2.createStringLiteral(fixed);
            }
            function fixupWhitespaceAndDecodeEntities(text) {
                let acc;
                let firstNonWhitespace = 0;
                let lastNonWhitespace = -1;
                for (let i = 0; i < text.length; i++) {
                    const c = text.charCodeAt(i);
                    if (isLineBreak(c)) {
                        if (firstNonWhitespace !== -1 && lastNonWhitespace !== -1) {
                            acc = addLineOfJsxText(acc, text.substr(firstNonWhitespace, lastNonWhitespace - firstNonWhitespace + 1));
                        }
                        firstNonWhitespace = -1;
                    }
                    else if (!isWhiteSpaceSingleLine(c)) {
                        lastNonWhitespace = i;
                        if (firstNonWhitespace === -1) {
                            firstNonWhitespace = i;
                        }
                    }
                }
                return firstNonWhitespace !== -1 ? addLineOfJsxText(acc, text.substr(firstNonWhitespace)) : acc;
            }
            function addLineOfJsxText(acc, trimmedLine) {
                const decoded = decodeEntities(trimmedLine);
                return acc === void 0 ? decoded : acc + " " + decoded;
            }
            function decodeEntities(text) {
                return text.replace(/&((#((\d+)|x([\da-fA-F]+)))|(\w+));/g, (match, _all, _number, _digits, decimal, hex, word) => {
                    if (decimal) {
                        return utf16EncodeAsString(parseInt(decimal, 10));
                    }
                    else if (hex) {
                        return utf16EncodeAsString(parseInt(hex, 16));
                    }
                    else {
                        const ch = entities.get(word);
                        return ch ? utf16EncodeAsString(ch) : match;
                    }
                });
            }
            function tryDecodeEntities(text) {
                const decoded = decodeEntities(text);
                return decoded === text ? void 0 : decoded;
            }
            function getTagName(node) {
                if (node.kind === 281 /* JsxElement */) {
                    return getTagName(node.openingElement);
                }
                else {
                    const name = node.tagName;
                    if (isIdentifier(name) && isIntrinsicJsxName(name.escapedText)) {
                        return factory2.createStringLiteral(idText(name));
                    }
                    else {
                        return createExpressionFromEntityName(factory2, name);
                    }
                }
            }
            function getAttributeName(node) {
                const name = node.name;
                const text = idText(name);
                if (/^[A-Za-z_]\w*$/.test(text)) {
                    return name;
                }
                else {
                    return factory2.createStringLiteral(text);
                }
            }
            function visitJsxExpression(node) {
                const expression = visitNode(node.expression, visitor, isExpression);
                return node.dotDotDotToken ? factory2.createSpreadElement(expression) : expression;
            }
        }