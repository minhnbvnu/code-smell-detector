function hasSideEffects(node, options) {
        var _a, _b;
        const queue = [];
        while (true) {
            switch (node.kind) {
                case ts.SyntaxKind.CallExpression:
                case ts.SyntaxKind.PostfixUnaryExpression:
                case ts.SyntaxKind.AwaitExpression:
                case ts.SyntaxKind.YieldExpression:
                case ts.SyntaxKind.DeleteExpression:
                    return true;
                case ts.SyntaxKind.TypeAssertionExpression:
                case ts.SyntaxKind.AsExpression:
                case ts.SyntaxKind.ParenthesizedExpression:
                case ts.SyntaxKind.NonNullExpression:
                case ts.SyntaxKind.VoidExpression:
                case ts.SyntaxKind.TypeOfExpression:
                case ts.SyntaxKind.PropertyAccessExpression:
                case ts.SyntaxKind.SpreadElement:
                case ts.SyntaxKind.PartiallyEmittedExpression:
                    node = node.expression;
                    continue;
                case ts.SyntaxKind.BinaryExpression:
                    if (isAssignmentKind(node.operatorToken.kind))
                        return true;
                    queue.push(node.right);
                    node = node.left;
                    continue;
                case ts.SyntaxKind.PrefixUnaryExpression:
                    switch (node.operator) {
                        case ts.SyntaxKind.PlusPlusToken:
                        case ts.SyntaxKind.MinusMinusToken:
                            return true;
                        default:
                            node = node.operand;
                            continue;
                    }
                case ts.SyntaxKind.ElementAccessExpression:
                    if (node.argumentExpression !== undefined) // for compatibility with typescript@<2.9.0
                        queue.push(node.argumentExpression);
                    node = node.expression;
                    continue;
                case ts.SyntaxKind.ConditionalExpression:
                    queue.push(node.whenTrue, node.whenFalse);
                    node = node.condition;
                    continue;
                case ts.SyntaxKind.NewExpression:
                    if (options & 2 /* Constructor */)
                        return true;
                    if (node.arguments !== undefined)
                        queue.push(...node.arguments);
                    node = node.expression;
                    continue;
                case ts.SyntaxKind.TaggedTemplateExpression:
                    if (options & 1 /* TaggedTemplate */)
                        return true;
                    queue.push(node.tag);
                    node = node.template;
                    if (node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral)
                        break;
                // falls through
                case ts.SyntaxKind.TemplateExpression:
                    for (const child of node.templateSpans)
                        queue.push(child.expression);
                    break;
                case ts.SyntaxKind.ClassExpression: {
                    if (node.decorators !== undefined)
                        return true;
                    for (const child of node.members) {
                        if (child.decorators !== undefined)
                            return true;
                        if (!hasModifier(child.modifiers, ts.SyntaxKind.DeclareKeyword)) {
                            if (((_a = child.name) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.ComputedPropertyName)
                                queue.push(child.name.expression);
                            if (node_1.isMethodDeclaration(child)) {
                                for (const p of child.parameters)
                                    if (p.decorators !== undefined)
                                        return true;
                            }
                            else if (node_1.isPropertyDeclaration(child) &&
                                child.initializer !== undefined &&
                                hasModifier(child.modifiers, ts.SyntaxKind.StaticKeyword)) {
                                queue.push(child.initializer);
                            }
                        }
                    }
                    const base = getBaseOfClassLikeExpression(node);
                    if (base === undefined)
                        break;
                    node = base.expression;
                    continue;
                }
                case ts.SyntaxKind.ArrayLiteralExpression:
                    queue.push(...node.elements);
                    break;
                case ts.SyntaxKind.ObjectLiteralExpression:
                    for (const child of node.properties) {
                        if (((_b = child.name) === null || _b === void 0 ? void 0 : _b.kind) === ts.SyntaxKind.ComputedPropertyName)
                            queue.push(child.name.expression);
                        switch (child.kind) {
                            case ts.SyntaxKind.PropertyAssignment:
                                queue.push(child.initializer);
                                break;
                            case ts.SyntaxKind.SpreadAssignment:
                                queue.push(child.expression);
                        }
                    }
                    break;
                case ts.SyntaxKind.JsxExpression:
                    if (node.expression === undefined)
                        break;
                    node = node.expression;
                    continue;
                case ts.SyntaxKind.JsxElement:
                case ts.SyntaxKind.JsxFragment:
                    for (const child of node.children)
                        if (child.kind !== ts.SyntaxKind.JsxText)
                            queue.push(child);
                    if (node.kind === ts.SyntaxKind.JsxFragment)
                        break;
                    node = node.openingElement;
                // falls through
                case ts.SyntaxKind.JsxSelfClosingElement:
                case ts.SyntaxKind.JsxOpeningElement:
                    if (options & 4 /* JsxElement */)
                        return true;
                    for (const child of node.attributes.properties) {
                        if (child.kind === ts.SyntaxKind.JsxSpreadAttribute) {
                            queue.push(child.expression);
                        }
                        else if (child.initializer !== undefined) {
                            queue.push(child.initializer);
                        }
                    }
                    break;
                case ts.SyntaxKind.CommaListExpression:
                    queue.push(...node.elements);
            }
            if (queue.length === 0)
                return false;
            node = queue.pop();
        }
    }