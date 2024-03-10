function getAccessKind(node) {
        const parent = node.parent;
        switch (parent.kind) {
            case ts.SyntaxKind.DeleteExpression:
                return 4 /* Delete */;
            case ts.SyntaxKind.PostfixUnaryExpression:
                return 3 /* ReadWrite */;
            case ts.SyntaxKind.PrefixUnaryExpression:
                return parent.operator === ts.SyntaxKind.PlusPlusToken ||
                    parent.operator === ts.SyntaxKind.MinusMinusToken
                    ? 3 /* ReadWrite */
                    : 1 /* Read */;
            case ts.SyntaxKind.BinaryExpression:
                return parent.right === node
                    ? 1 /* Read */
                    : !isAssignmentKind(parent.operatorToken.kind)
                        ? 1 /* Read */
                        : parent.operatorToken.kind === ts.SyntaxKind.EqualsToken
                            ? 2 /* Write */
                            : 3 /* ReadWrite */;
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                return parent.objectAssignmentInitializer === node
                    ? 1 /* Read */
                    : isInDestructuringAssignment(parent)
                        ? 2 /* Write */
                        : 1 /* Read */;
            case ts.SyntaxKind.PropertyAssignment:
                return parent.name === node
                    ? 0 /* None */
                    : isInDestructuringAssignment(parent)
                        ? 2 /* Write */
                        : 1 /* Read */;
            case ts.SyntaxKind.ArrayLiteralExpression:
            case ts.SyntaxKind.SpreadElement:
            case ts.SyntaxKind.SpreadAssignment:
                return isInDestructuringAssignment(parent)
                    ? 2 /* Write */
                    : 1 /* Read */;
            case ts.SyntaxKind.ParenthesizedExpression:
            case ts.SyntaxKind.NonNullExpression:
            case ts.SyntaxKind.TypeAssertionExpression:
            case ts.SyntaxKind.AsExpression:
                // (<number>foo! as {})++
                return getAccessKind(parent);
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.ForInStatement:
                return parent.initializer === node
                    ? 2 /* Write */
                    : 1 /* Read */;
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                return parent.parent.token === ts.SyntaxKind.ExtendsKeyword &&
                    parent.parent.parent.kind !== ts.SyntaxKind.InterfaceDeclaration
                    ? 1 /* Read */
                    : 0 /* None */;
            case ts.SyntaxKind.ComputedPropertyName:
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.TypeOfExpression:
            case ts.SyntaxKind.ElementAccessExpression:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WithStatement:
            case ts.SyntaxKind.ThrowStatement:
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression:
            case ts.SyntaxKind.TaggedTemplateExpression:
            case ts.SyntaxKind.JsxExpression:
            case ts.SyntaxKind.Decorator:
            case ts.SyntaxKind.TemplateSpan:
            case ts.SyntaxKind.JsxOpeningElement:
            case ts.SyntaxKind.JsxSelfClosingElement:
            case ts.SyntaxKind.JsxSpreadAttribute:
            case ts.SyntaxKind.VoidExpression:
            case ts.SyntaxKind.ReturnStatement:
            case ts.SyntaxKind.AwaitExpression:
            case ts.SyntaxKind.YieldExpression:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.CaseClause:
            case ts.SyntaxKind.JsxElement:
                return 1 /* Read */;
            case ts.SyntaxKind.ArrowFunction:
                return parent.body === node
                    ? 1 /* Read */
                    : 2 /* Write */;
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.EnumMember:
            case ts.SyntaxKind.BindingElement:
            case ts.SyntaxKind.JsxAttribute:
                return parent.initializer === node
                    ? 1 /* Read */
                    : 0 /* None */;
            case ts.SyntaxKind.PropertyAccessExpression:
                return parent.expression === node
                    ? 1 /* Read */
                    : 0 /* None */;
            case ts.SyntaxKind.ExportAssignment:
                return parent.isExportEquals
                    ? 1 /* Read */
                    : 0 /* None */;
        }
        return 0 /* None */;
    }