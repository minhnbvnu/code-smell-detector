function isExpressionValueUsed(node) {
        while (true) {
            const parent = node.parent;
            switch (parent.kind) {
                case ts.SyntaxKind.CallExpression:
                case ts.SyntaxKind.NewExpression:
                case ts.SyntaxKind.ElementAccessExpression:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.WithStatement:
                case ts.SyntaxKind.ThrowStatement:
                case ts.SyntaxKind.ReturnStatement:
                case ts.SyntaxKind.JsxExpression:
                case ts.SyntaxKind.JsxSpreadAttribute:
                case ts.SyntaxKind.JsxElement:
                case ts.SyntaxKind.JsxFragment:
                case ts.SyntaxKind.JsxSelfClosingElement:
                case ts.SyntaxKind.ComputedPropertyName:
                case ts.SyntaxKind.ArrowFunction:
                case ts.SyntaxKind.ExportSpecifier:
                case ts.SyntaxKind.ExportAssignment:
                case ts.SyntaxKind.ImportDeclaration:
                case ts.SyntaxKind.ExternalModuleReference:
                case ts.SyntaxKind.Decorator:
                case ts.SyntaxKind.TaggedTemplateExpression:
                case ts.SyntaxKind.TemplateSpan:
                case ts.SyntaxKind.ExpressionWithTypeArguments:
                case ts.SyntaxKind.TypeOfExpression:
                case ts.SyntaxKind.AwaitExpression:
                case ts.SyntaxKind.YieldExpression:
                case ts.SyntaxKind.LiteralType:
                case ts.SyntaxKind.JsxAttributes:
                case ts.SyntaxKind.JsxOpeningElement:
                case ts.SyntaxKind.JsxClosingElement:
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.CaseClause:
                case ts.SyntaxKind.SwitchStatement:
                    return true;
                case ts.SyntaxKind.PropertyAccessExpression:
                    return parent.expression === node;
                case ts.SyntaxKind.QualifiedName:
                    return parent.left === node;
                case ts.SyntaxKind.ShorthandPropertyAssignment:
                    return parent.objectAssignmentInitializer === node ||
                        !isInDestructuringAssignment(parent);
                case ts.SyntaxKind.PropertyAssignment:
                    return parent.initializer === node && !isInDestructuringAssignment(parent);
                case ts.SyntaxKind.SpreadAssignment:
                case ts.SyntaxKind.SpreadElement:
                case ts.SyntaxKind.ArrayLiteralExpression:
                    return !isInDestructuringAssignment(parent);
                case ts.SyntaxKind.ParenthesizedExpression:
                case ts.SyntaxKind.AsExpression:
                case ts.SyntaxKind.TypeAssertionExpression:
                case ts.SyntaxKind.PostfixUnaryExpression:
                case ts.SyntaxKind.PrefixUnaryExpression:
                case ts.SyntaxKind.NonNullExpression:
                    node = parent;
                    continue;
                case ts.SyntaxKind.ForStatement:
                    return parent.condition === node;
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                    return parent.expression === node;
                case ts.SyntaxKind.ConditionalExpression:
                    if (parent.condition === node)
                        return true;
                    node = parent;
                    break;
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.BindingElement:
                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.Parameter:
                case ts.SyntaxKind.EnumMember:
                    return parent.initializer === node;
                case ts.SyntaxKind.ImportEqualsDeclaration:
                    return parent.moduleReference === node;
                case ts.SyntaxKind.CommaListExpression:
                    if (parent.elements[parent.elements.length - 1] !== node)
                        return false;
                    node = parent;
                    break;
                case ts.SyntaxKind.BinaryExpression:
                    if (parent.right === node) {
                        if (parent.operatorToken.kind === ts.SyntaxKind.CommaToken) {
                            node = parent;
                            break;
                        }
                        return true;
                    }
                    switch (parent.operatorToken.kind) {
                        case ts.SyntaxKind.CommaToken:
                        case ts.SyntaxKind.EqualsToken:
                            return false;
                        case ts.SyntaxKind.EqualsEqualsEqualsToken:
                        case ts.SyntaxKind.EqualsEqualsToken:
                        case ts.SyntaxKind.ExclamationEqualsEqualsToken:
                        case ts.SyntaxKind.ExclamationEqualsToken:
                        case ts.SyntaxKind.InstanceOfKeyword:
                        case ts.SyntaxKind.PlusToken:
                        case ts.SyntaxKind.MinusToken:
                        case ts.SyntaxKind.AsteriskToken:
                        case ts.SyntaxKind.SlashToken:
                        case ts.SyntaxKind.PercentToken:
                        case ts.SyntaxKind.AsteriskAsteriskToken:
                        case ts.SyntaxKind.GreaterThanToken:
                        case ts.SyntaxKind.GreaterThanGreaterThanToken:
                        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                        case ts.SyntaxKind.GreaterThanEqualsToken:
                        case ts.SyntaxKind.LessThanToken:
                        case ts.SyntaxKind.LessThanLessThanToken:
                        case ts.SyntaxKind.LessThanEqualsToken:
                        case ts.SyntaxKind.AmpersandToken:
                        case ts.SyntaxKind.BarToken:
                        case ts.SyntaxKind.CaretToken:
                        case ts.SyntaxKind.BarBarToken:
                        case ts.SyntaxKind.AmpersandAmpersandToken:
                        case ts.SyntaxKind.QuestionQuestionToken:
                        case ts.SyntaxKind.InKeyword:
                        case ts.SyntaxKind.QuestionQuestionEqualsToken:
                        case ts.SyntaxKind.AmpersandAmpersandEqualsToken:
                        case ts.SyntaxKind.BarBarEqualsToken:
                            return true;
                        default:
                            node = parent;
                    }
                    break;
                default:
                    return false;
            }
        }
    }