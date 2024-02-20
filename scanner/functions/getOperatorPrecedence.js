function getOperatorPrecedence(nodeKind, operatorKind, hasArguments) {
        switch (nodeKind) {
            case typescript_1.SyntaxKind.CommaListExpression:
                return OperatorPrecedence.Comma;
            case typescript_1.SyntaxKind.SpreadElement:
                return OperatorPrecedence.Spread;
            case typescript_1.SyntaxKind.YieldExpression:
                return OperatorPrecedence.Yield;
            case typescript_1.SyntaxKind.ConditionalExpression:
                return OperatorPrecedence.Conditional;
            case typescript_1.SyntaxKind.BinaryExpression:
                switch (operatorKind) {
                    case typescript_1.SyntaxKind.CommaToken:
                        return OperatorPrecedence.Comma;
                    case typescript_1.SyntaxKind.EqualsToken:
                    case typescript_1.SyntaxKind.PlusEqualsToken:
                    case typescript_1.SyntaxKind.MinusEqualsToken:
                    case typescript_1.SyntaxKind.AsteriskAsteriskEqualsToken:
                    case typescript_1.SyntaxKind.AsteriskEqualsToken:
                    case typescript_1.SyntaxKind.SlashEqualsToken:
                    case typescript_1.SyntaxKind.PercentEqualsToken:
                    case typescript_1.SyntaxKind.LessThanLessThanEqualsToken:
                    case typescript_1.SyntaxKind.GreaterThanGreaterThanEqualsToken:
                    case typescript_1.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                    case typescript_1.SyntaxKind.AmpersandEqualsToken:
                    case typescript_1.SyntaxKind.CaretEqualsToken:
                    case typescript_1.SyntaxKind.BarEqualsToken:
                    case typescript_1.SyntaxKind.BarBarEqualsToken:
                    case typescript_1.SyntaxKind.AmpersandAmpersandEqualsToken:
                    case typescript_1.SyntaxKind.QuestionQuestionEqualsToken:
                        return OperatorPrecedence.Assignment;
                    default:
                        return getBinaryOperatorPrecedence(operatorKind);
                }
            // TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
            case typescript_1.SyntaxKind.TypeAssertionExpression:
            case typescript_1.SyntaxKind.NonNullExpression:
            case typescript_1.SyntaxKind.PrefixUnaryExpression:
            case typescript_1.SyntaxKind.TypeOfExpression:
            case typescript_1.SyntaxKind.VoidExpression:
            case typescript_1.SyntaxKind.DeleteExpression:
            case typescript_1.SyntaxKind.AwaitExpression:
                return OperatorPrecedence.Unary;
            case typescript_1.SyntaxKind.PostfixUnaryExpression:
                return OperatorPrecedence.Update;
            case typescript_1.SyntaxKind.CallExpression:
                return OperatorPrecedence.LeftHandSide;
            case typescript_1.SyntaxKind.NewExpression:
                return hasArguments
                    ? OperatorPrecedence.Member
                    : OperatorPrecedence.LeftHandSide;
            case typescript_1.SyntaxKind.TaggedTemplateExpression:
            case typescript_1.SyntaxKind.PropertyAccessExpression:
            case typescript_1.SyntaxKind.ElementAccessExpression:
            case typescript_1.SyntaxKind.MetaProperty:
                return OperatorPrecedence.Member;
            case typescript_1.SyntaxKind.AsExpression:
                return OperatorPrecedence.Relational;
            case typescript_1.SyntaxKind.ThisKeyword:
            case typescript_1.SyntaxKind.SuperKeyword:
            case typescript_1.SyntaxKind.Identifier:
            case typescript_1.SyntaxKind.PrivateIdentifier:
            case typescript_1.SyntaxKind.NullKeyword:
            case typescript_1.SyntaxKind.TrueKeyword:
            case typescript_1.SyntaxKind.FalseKeyword:
            case typescript_1.SyntaxKind.NumericLiteral:
            case typescript_1.SyntaxKind.BigIntLiteral:
            case typescript_1.SyntaxKind.StringLiteral:
            case typescript_1.SyntaxKind.ArrayLiteralExpression:
            case typescript_1.SyntaxKind.ObjectLiteralExpression:
            case typescript_1.SyntaxKind.FunctionExpression:
            case typescript_1.SyntaxKind.ArrowFunction:
            case typescript_1.SyntaxKind.ClassExpression:
            case typescript_1.SyntaxKind.RegularExpressionLiteral:
            case typescript_1.SyntaxKind.NoSubstitutionTemplateLiteral:
            case typescript_1.SyntaxKind.TemplateExpression:
            case typescript_1.SyntaxKind.ParenthesizedExpression:
            case typescript_1.SyntaxKind.OmittedExpression:
            case typescript_1.SyntaxKind.JsxElement:
            case typescript_1.SyntaxKind.JsxSelfClosingElement:
            case typescript_1.SyntaxKind.JsxFragment:
                return OperatorPrecedence.Primary;
            default:
                return OperatorPrecedence.Invalid;
        }
    }