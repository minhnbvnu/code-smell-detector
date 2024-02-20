function addChildrenRecursively(node) {
            curCancellationToken.throwIfCancellationRequested();
            if (!node || isToken(node)) {
                return;
            }
            switch (node.kind) {
                case 173 /* Constructor */:
                    const ctr = node;
                    addNodeWithRecursiveChild(ctr, ctr.body);
                    for (const param of ctr.parameters) {
                        if (isParameterPropertyDeclaration(param, ctr)) {
                            addLeafNode(param);
                        }
                    }
                    break;
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 170 /* MethodSignature */:
                    if (hasNavigationBarName(node)) {
                        addNodeWithRecursiveChild(node, node.body);
                    }
                    break;
                case 169 /* PropertyDeclaration */:
                    if (hasNavigationBarName(node)) {
                        addNodeWithRecursiveInitializer(node);
                    }
                    break;
                case 168 /* PropertySignature */:
                    if (hasNavigationBarName(node)) {
                        addLeafNode(node);
                    }
                    break;
                case 270 /* ImportClause */:
                    const importClause = node;
                    if (importClause.name) {
                        addLeafNode(importClause.name);
                    }
                    const { namedBindings } = importClause;
                    if (namedBindings) {
                        if (namedBindings.kind === 271 /* NamespaceImport */) {
                            addLeafNode(namedBindings);
                        }
                        else {
                            for (const element of namedBindings.elements) {
                                addLeafNode(element);
                            }
                        }
                    }
                    break;
                case 300 /* ShorthandPropertyAssignment */:
                    addNodeWithRecursiveChild(node, node.name);
                    break;
                case 301 /* SpreadAssignment */:
                    const { expression } = node;
                    isIdentifier(expression) ? addLeafNode(node, expression) : addLeafNode(node);
                    break;
                case 205 /* BindingElement */:
                case 299 /* PropertyAssignment */:
                case 257 /* VariableDeclaration */: {
                    const child = node;
                    if (isBindingPattern(child.name)) {
                        addChildrenRecursively(child.name);
                    }
                    else {
                        addNodeWithRecursiveInitializer(child);
                    }
                    break;
                }
                case 259 /* FunctionDeclaration */:
                    const nameNode = node.name;
                    if (nameNode && isIdentifier(nameNode)) {
                        addTrackedEs5Class(nameNode.text);
                    }
                    addNodeWithRecursiveChild(node, node.body);
                    break;
                case 216 /* ArrowFunction */:
                case 215 /* FunctionExpression */:
                    addNodeWithRecursiveChild(node, node.body);
                    break;
                case 263 /* EnumDeclaration */:
                    startNode(node);
                    for (const member of node.members) {
                        if (!isComputedProperty(member)) {
                            addLeafNode(member);
                        }
                    }
                    endNode();
                    break;
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 261 /* InterfaceDeclaration */:
                    startNode(node);
                    for (const member of node.members) {
                        addChildrenRecursively(member);
                    }
                    endNode();
                    break;
                case 264 /* ModuleDeclaration */:
                    addNodeWithRecursiveChild(node, getInteriorModule(node).body);
                    break;
                case 274 /* ExportAssignment */: {
                    const expression2 = node.expression;
                    const child = isObjectLiteralExpression(expression2) || isCallExpression(expression2) ? expression2 : isArrowFunction(expression2) || isFunctionExpression(expression2) ? expression2.body : void 0;
                    if (child) {
                        startNode(node);
                        addChildrenRecursively(child);
                        endNode();
                    }
                    else {
                        addLeafNode(node);
                    }
                    break;
                }
                case 278 /* ExportSpecifier */:
                case 268 /* ImportEqualsDeclaration */:
                case 178 /* IndexSignature */:
                case 176 /* CallSignature */:
                case 177 /* ConstructSignature */:
                case 262 /* TypeAliasDeclaration */:
                    addLeafNode(node);
                    break;
                case 210 /* CallExpression */:
                case 223 /* BinaryExpression */: {
                    const special = getAssignmentDeclarationKind(node);
                    switch (special) {
                        case 1 /* ExportsProperty */:
                        case 2 /* ModuleExports */:
                            addNodeWithRecursiveChild(node, node.right);
                            return;
                        case 6 /* Prototype */:
                        case 3 /* PrototypeProperty */: {
                            const binaryExpression = node;
                            const assignmentTarget = binaryExpression.left;
                            const prototypeAccess = special === 3 /* PrototypeProperty */ ? assignmentTarget.expression : assignmentTarget;
                            let depth = 0;
                            let className;
                            if (isIdentifier(prototypeAccess.expression)) {
                                addTrackedEs5Class(prototypeAccess.expression.text);
                                className = prototypeAccess.expression;
                            }
                            else {
                                [depth, className] = startNestedNodes(binaryExpression, prototypeAccess.expression);
                            }
                            if (special === 6 /* Prototype */) {
                                if (isObjectLiteralExpression(binaryExpression.right)) {
                                    if (binaryExpression.right.properties.length > 0) {
                                        startNode(binaryExpression, className);
                                        forEachChild(binaryExpression.right, addChildrenRecursively);
                                        endNode();
                                    }
                                }
                            }
                            else if (isFunctionExpression(binaryExpression.right) || isArrowFunction(binaryExpression.right)) {
                                addNodeWithRecursiveChild(node, binaryExpression.right, className);
                            }
                            else {
                                startNode(binaryExpression, className);
                                addNodeWithRecursiveChild(node, binaryExpression.right, assignmentTarget.name);
                                endNode();
                            }
                            endNestedNodes(depth);
                            return;
                        }
                        case 7 /* ObjectDefinePropertyValue */:
                        case 9 /* ObjectDefinePrototypeProperty */: {
                            const defineCall = node;
                            const className = special === 7 /* ObjectDefinePropertyValue */ ? defineCall.arguments[0] : defineCall.arguments[0].expression;
                            const memberName = defineCall.arguments[1];
                            const [depth, classNameIdentifier] = startNestedNodes(node, className);
                            startNode(node, classNameIdentifier);
                            startNode(node, setTextRange(factory.createIdentifier(memberName.text), memberName));
                            addChildrenRecursively(node.arguments[2]);
                            endNode();
                            endNode();
                            endNestedNodes(depth);
                            return;
                        }
                        case 5 /* Property */: {
                            const binaryExpression = node;
                            const assignmentTarget = binaryExpression.left;
                            const targetFunction = assignmentTarget.expression;
                            if (isIdentifier(targetFunction) && getElementOrPropertyAccessName(assignmentTarget) !== "prototype" && trackedEs5Classes && trackedEs5Classes.has(targetFunction.text)) {
                                if (isFunctionExpression(binaryExpression.right) || isArrowFunction(binaryExpression.right)) {
                                    addNodeWithRecursiveChild(node, binaryExpression.right, targetFunction);
                                }
                                else if (isBindableStaticAccessExpression(assignmentTarget)) {
                                    startNode(binaryExpression, targetFunction);
                                    addNodeWithRecursiveChild(binaryExpression.left, binaryExpression.right, getNameOrArgument(assignmentTarget));
                                    endNode();
                                }
                                return;
                            }
                            break;
                        }
                        case 4 /* ThisProperty */:
                        case 0 /* None */:
                        case 8 /* ObjectDefinePropertyExports */:
                            break;
                        default:
                            Debug.assertNever(special);
                    }
                }
                default:
                    if (hasJSDocNodes(node)) {
                        forEach(node.jsDoc, (jsDoc) => {
                            forEach(jsDoc.tags, (tag) => {
                                if (isJSDocTypeAlias(tag)) {
                                    addLeafNode(tag);
                                }
                            });
                        });
                    }
                    forEachChild(node, addChildrenRecursively);
            }
        }