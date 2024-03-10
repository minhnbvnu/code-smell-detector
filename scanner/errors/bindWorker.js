function bindWorker(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        if (node.flags & 2048 /* IdentifierIsInJSDocNamespace */) {
                            let parentNode = node.parent;
                            while (parentNode && !isJSDocTypeAlias(parentNode)) {
                                parentNode = parentNode.parent;
                            }
                            bindBlockScopedDeclaration(parentNode, 524288 /* TypeAlias */, 788968 /* TypeAliasExcludes */);
                            break;
                        }
                    case 108 /* ThisKeyword */:
                        if (currentFlow && (isExpression(node) || parent2.kind === 300 /* ShorthandPropertyAssignment */)) {
                            node.flowNode = currentFlow;
                        }
                        return checkContextualIdentifier(node);
                    case 163 /* QualifiedName */:
                        if (currentFlow && isPartOfTypeQuery(node)) {
                            node.flowNode = currentFlow;
                        }
                        break;
                    case 233 /* MetaProperty */:
                    case 106 /* SuperKeyword */:
                        node.flowNode = currentFlow;
                        break;
                    case 80 /* PrivateIdentifier */:
                        return checkPrivateIdentifier(node);
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        const expr = node;
                        if (currentFlow && isNarrowableReference(expr)) {
                            expr.flowNode = currentFlow;
                        }
                        if (isSpecialPropertyDeclaration(expr)) {
                            bindSpecialPropertyDeclaration(expr);
                        }
                        if (isInJSFile(expr) && file.commonJsModuleIndicator && isModuleExportsAccessExpression(expr) && !lookupSymbolForName(blockScopeContainer, "module")) {
                            declareSymbol(file.locals, 
                            /*parent*/
                            void 0, expr.expression, 1 /* FunctionScopedVariable */ | 134217728 /* ModuleExports */, 111550 /* FunctionScopedVariableExcludes */);
                        }
                        break;
                    case 223 /* BinaryExpression */:
                        const specialKind = getAssignmentDeclarationKind(node);
                        switch (specialKind) {
                            case 1 /* ExportsProperty */:
                                bindExportsPropertyAssignment(node);
                                break;
                            case 2 /* ModuleExports */:
                                bindModuleExportsAssignment(node);
                                break;
                            case 3 /* PrototypeProperty */:
                                bindPrototypePropertyAssignment(node.left, node);
                                break;
                            case 6 /* Prototype */:
                                bindPrototypeAssignment(node);
                                break;
                            case 4 /* ThisProperty */:
                                bindThisPropertyAssignment(node);
                                break;
                            case 5 /* Property */:
                                const expression = node.left.expression;
                                if (isInJSFile(node) && isIdentifier(expression)) {
                                    const symbol = lookupSymbolForName(blockScopeContainer, expression.escapedText);
                                    if (isThisInitializedDeclaration(symbol == null ? void 0 : symbol.valueDeclaration)) {
                                        bindThisPropertyAssignment(node);
                                        break;
                                    }
                                }
                                bindSpecialPropertyAssignment(node);
                                break;
                            case 0 /* None */:
                                break;
                            default:
                                Debug.fail("Unknown binary expression special property assignment kind");
                        }
                        return checkStrictModeBinaryExpression(node);
                    case 295 /* CatchClause */:
                        return checkStrictModeCatchClause(node);
                    case 217 /* DeleteExpression */:
                        return checkStrictModeDeleteExpression(node);
                    case 8 /* NumericLiteral */:
                        return checkStrictModeNumericLiteral(node);
                    case 222 /* PostfixUnaryExpression */:
                        return checkStrictModePostfixUnaryExpression(node);
                    case 221 /* PrefixUnaryExpression */:
                        return checkStrictModePrefixUnaryExpression(node);
                    case 251 /* WithStatement */:
                        return checkStrictModeWithStatement(node);
                    case 253 /* LabeledStatement */:
                        return checkStrictModeLabeledStatement(node);
                    case 194 /* ThisType */:
                        seenThisKeyword = true;
                        return;
                    case 179 /* TypePredicate */:
                        break;
                    case 165 /* TypeParameter */:
                        return bindTypeParameter(node);
                    case 166 /* Parameter */:
                        return bindParameter(node);
                    case 257 /* VariableDeclaration */:
                        return bindVariableDeclarationOrBindingElement(node);
                    case 205 /* BindingElement */:
                        node.flowNode = currentFlow;
                        return bindVariableDeclarationOrBindingElement(node);
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                        return bindPropertyWorker(node);
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                        return bindPropertyOrMethodOrAccessor(node, 4 /* Property */, 0 /* PropertyExcludes */);
                    case 302 /* EnumMember */:
                        return bindPropertyOrMethodOrAccessor(node, 8 /* EnumMember */, 900095 /* EnumMemberExcludes */);
                    case 176 /* CallSignature */:
                    case 177 /* ConstructSignature */:
                    case 178 /* IndexSignature */:
                        return declareSymbolAndAddToSymbolTable(node, 131072 /* Signature */, 0 /* None */);
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        return bindPropertyOrMethodOrAccessor(node, 8192 /* Method */ | (node.questionToken ? 16777216 /* Optional */ : 0 /* None */), isObjectLiteralMethod(node) ? 0 /* PropertyExcludes */ : 103359 /* MethodExcludes */);
                    case 259 /* FunctionDeclaration */:
                        return bindFunctionDeclaration(node);
                    case 173 /* Constructor */:
                        return declareSymbolAndAddToSymbolTable(node, 16384 /* Constructor */, 
                        /*symbolExcludes:*/
                        0 /* None */);
                    case 174 /* GetAccessor */:
                        return bindPropertyOrMethodOrAccessor(node, 32768 /* GetAccessor */, 46015 /* GetAccessorExcludes */);
                    case 175 /* SetAccessor */:
                        return bindPropertyOrMethodOrAccessor(node, 65536 /* SetAccessor */, 78783 /* SetAccessorExcludes */);
                    case 181 /* FunctionType */:
                    case 320 /* JSDocFunctionType */:
                    case 326 /* JSDocSignature */:
                    case 182 /* ConstructorType */:
                        return bindFunctionOrConstructorType(node);
                    case 184 /* TypeLiteral */:
                    case 325 /* JSDocTypeLiteral */:
                    case 197 /* MappedType */:
                        return bindAnonymousTypeWorker(node);
                    case 335 /* JSDocClassTag */:
                        return bindJSDocClassTag(node);
                    case 207 /* ObjectLiteralExpression */:
                        return bindObjectLiteralExpression(node);
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        return bindFunctionExpression(node);
                    case 210 /* CallExpression */:
                        const assignmentKind = getAssignmentDeclarationKind(node);
                        switch (assignmentKind) {
                            case 7 /* ObjectDefinePropertyValue */:
                                return bindObjectDefinePropertyAssignment(node);
                            case 8 /* ObjectDefinePropertyExports */:
                                return bindObjectDefinePropertyExport(node);
                            case 9 /* ObjectDefinePrototypeProperty */:
                                return bindObjectDefinePrototypeProperty(node);
                            case 0 /* None */:
                                break;
                            default:
                                return Debug.fail("Unknown call expression assignment declaration kind");
                        }
                        if (isInJSFile(node)) {
                            bindCallExpression(node);
                        }
                        break;
                    case 228 /* ClassExpression */:
                    case 260 /* ClassDeclaration */:
                        inStrictMode = true;
                        return bindClassLikeDeclaration(node);
                    case 261 /* InterfaceDeclaration */:
                        return bindBlockScopedDeclaration(node, 64 /* Interface */, 788872 /* InterfaceExcludes */);
                    case 262 /* TypeAliasDeclaration */:
                        return bindBlockScopedDeclaration(node, 524288 /* TypeAlias */, 788968 /* TypeAliasExcludes */);
                    case 263 /* EnumDeclaration */:
                        return bindEnumDeclaration(node);
                    case 264 /* ModuleDeclaration */:
                        return bindModuleDeclaration(node);
                    case 289 /* JsxAttributes */:
                        return bindJsxAttributes(node);
                    case 288 /* JsxAttribute */:
                        return bindJsxAttribute(node, 4 /* Property */, 0 /* PropertyExcludes */);
                    case 268 /* ImportEqualsDeclaration */:
                    case 271 /* NamespaceImport */:
                    case 273 /* ImportSpecifier */:
                    case 278 /* ExportSpecifier */:
                        return declareSymbolAndAddToSymbolTable(node, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                    case 267 /* NamespaceExportDeclaration */:
                        return bindNamespaceExportDeclaration(node);
                    case 270 /* ImportClause */:
                        return bindImportClause(node);
                    case 275 /* ExportDeclaration */:
                        return bindExportDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return bindExportAssignment(node);
                    case 308 /* SourceFile */:
                        updateStrictModeStatementList(node.statements);
                        return bindSourceFileIfExternalModule();
                    case 238 /* Block */:
                        if (!isFunctionLikeOrClassStaticBlockDeclaration(node.parent)) {
                            return;
                        }
                    case 265 /* ModuleBlock */:
                        return updateStrictModeStatementList(node.statements);
                    case 344 /* JSDocParameterTag */:
                        if (node.parent.kind === 326 /* JSDocSignature */) {
                            return bindParameter(node);
                        }
                        if (node.parent.kind !== 325 /* JSDocTypeLiteral */) {
                            break;
                        }
                    case 351 /* JSDocPropertyTag */:
                        const propTag = node;
                        const flags = propTag.isBracketed || propTag.typeExpression && propTag.typeExpression.type.kind === 319 /* JSDocOptionalType */ ? 4 /* Property */ | 16777216 /* Optional */ : 4 /* Property */;
                        return declareSymbolAndAddToSymbolTable(propTag, flags, 0 /* PropertyExcludes */);
                    case 349 /* JSDocTypedefTag */:
                    case 341 /* JSDocCallbackTag */:
                    case 343 /* JSDocEnumTag */:
                        return (delayedTypeAliases || (delayedTypeAliases = [])).push(node);
                    case 342 /* JSDocOverloadTag */:
                        return bind(node.typeExpression);
                }
            }