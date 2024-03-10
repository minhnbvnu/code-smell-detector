function getTokenType(token) {
        let keywordKind;
        if (isAtLeast50 && token.kind === SyntaxKind.Identifier) {
            keywordKind = ts.identifierToKeywordKind(token);
        }
        else if ('originalKeywordKind' in token) {
            // eslint-disable-next-line deprecation/deprecation -- intentional fallback for older TS versions
            keywordKind = token.originalKeywordKind;
        }
        if (keywordKind) {
            if (keywordKind === SyntaxKind.NullKeyword) {
                return ts_estree_1.AST_TOKEN_TYPES.Null;
            }
            else if (keywordKind >= SyntaxKind.FirstFutureReservedWord &&
                keywordKind <= SyntaxKind.LastKeyword) {
                return ts_estree_1.AST_TOKEN_TYPES.Identifier;
            }
            return ts_estree_1.AST_TOKEN_TYPES.Keyword;
        }
        if (token.kind >= SyntaxKind.FirstKeyword &&
            token.kind <= SyntaxKind.LastFutureReservedWord) {
            if (token.kind === SyntaxKind.FalseKeyword ||
                token.kind === SyntaxKind.TrueKeyword) {
                return ts_estree_1.AST_TOKEN_TYPES.Boolean;
            }
            return ts_estree_1.AST_TOKEN_TYPES.Keyword;
        }
        if (token.kind >= SyntaxKind.FirstPunctuation &&
            token.kind <= SyntaxKind.LastPunctuation) {
            return ts_estree_1.AST_TOKEN_TYPES.Punctuator;
        }
        if (token.kind >= SyntaxKind.NoSubstitutionTemplateLiteral &&
            token.kind <= SyntaxKind.TemplateTail) {
            return ts_estree_1.AST_TOKEN_TYPES.Template;
        }
        switch (token.kind) {
            case SyntaxKind.NumericLiteral:
                return ts_estree_1.AST_TOKEN_TYPES.Numeric;
            case SyntaxKind.JsxText:
                return ts_estree_1.AST_TOKEN_TYPES.JSXText;
            case SyntaxKind.StringLiteral:
                // A TypeScript-StringLiteral token with a TypeScript-JsxAttribute or TypeScript-JsxElement parent,
                // must actually be an ESTree-JSXText token
                if (token.parent &&
                    (token.parent.kind === SyntaxKind.JsxAttribute ||
                        token.parent.kind === SyntaxKind.JsxElement)) {
                    return ts_estree_1.AST_TOKEN_TYPES.JSXText;
                }
                return ts_estree_1.AST_TOKEN_TYPES.String;
            case SyntaxKind.RegularExpressionLiteral:
                return ts_estree_1.AST_TOKEN_TYPES.RegularExpression;
            case SyntaxKind.Identifier:
            case SyntaxKind.ConstructorKeyword:
            case SyntaxKind.GetKeyword:
            case SyntaxKind.SetKeyword:
            // intentional fallthrough
            default:
        }
        // Some JSX tokens have to be determined based on their parent
        if (token.parent && token.kind === SyntaxKind.Identifier) {
            if (isJSXToken(token.parent)) {
                return ts_estree_1.AST_TOKEN_TYPES.JSXIdentifier;
            }
            if (token.parent.kind === SyntaxKind.PropertyAccessExpression &&
                hasJSXAncestor(token)) {
                return ts_estree_1.AST_TOKEN_TYPES.JSXIdentifier;
            }
        }
        return ts_estree_1.AST_TOKEN_TYPES.Identifier;
    }