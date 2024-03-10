function getBinaryOperatorPrecedence(kind) {
        switch (kind) {
            case typescript_1.SyntaxKind.QuestionQuestionToken:
                return OperatorPrecedence.Coalesce;
            case typescript_1.SyntaxKind.BarBarToken:
                return OperatorPrecedence.LogicalOR;
            case typescript_1.SyntaxKind.AmpersandAmpersandToken:
                return OperatorPrecedence.LogicalAND;
            case typescript_1.SyntaxKind.BarToken:
                return OperatorPrecedence.BitwiseOR;
            case typescript_1.SyntaxKind.CaretToken:
                return OperatorPrecedence.BitwiseXOR;
            case typescript_1.SyntaxKind.AmpersandToken:
                return OperatorPrecedence.BitwiseAND;
            case typescript_1.SyntaxKind.EqualsEqualsToken:
            case typescript_1.SyntaxKind.ExclamationEqualsToken:
            case typescript_1.SyntaxKind.EqualsEqualsEqualsToken:
            case typescript_1.SyntaxKind.ExclamationEqualsEqualsToken:
                return OperatorPrecedence.Equality;
            case typescript_1.SyntaxKind.LessThanToken:
            case typescript_1.SyntaxKind.GreaterThanToken:
            case typescript_1.SyntaxKind.LessThanEqualsToken:
            case typescript_1.SyntaxKind.GreaterThanEqualsToken:
            case typescript_1.SyntaxKind.InstanceOfKeyword:
            case typescript_1.SyntaxKind.InKeyword:
            case typescript_1.SyntaxKind.AsKeyword:
                return OperatorPrecedence.Relational;
            case typescript_1.SyntaxKind.LessThanLessThanToken:
            case typescript_1.SyntaxKind.GreaterThanGreaterThanToken:
            case typescript_1.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                return OperatorPrecedence.Shift;
            case typescript_1.SyntaxKind.PlusToken:
            case typescript_1.SyntaxKind.MinusToken:
                return OperatorPrecedence.Additive;
            case typescript_1.SyntaxKind.AsteriskToken:
            case typescript_1.SyntaxKind.SlashToken:
            case typescript_1.SyntaxKind.PercentToken:
                return OperatorPrecedence.Multiplicative;
            case typescript_1.SyntaxKind.AsteriskAsteriskToken:
                return OperatorPrecedence.Exponentiation;
        }
        // -1 is lower than all other precedences.  Returning it will cause binary expression
        // parsing to stop.
        return -1;
    }