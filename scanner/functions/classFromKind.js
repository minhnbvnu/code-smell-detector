function classFromKind(token) {
            if (isKeyword(token)) {
                return 3 /* keyword */;
            }
            else if (isBinaryExpressionOperatorToken(token) || isPrefixUnaryExpressionOperatorToken(token)) {
                return 5 /* operator */;
            }
            else if (token >= 18 /* FirstPunctuation */ && token <= 78 /* LastPunctuation */) {
                return 10 /* punctuation */;
            }
            switch (token) {
                case 8 /* NumericLiteral */:
                    return 4 /* numericLiteral */;
                case 9 /* BigIntLiteral */:
                    return 25 /* bigintLiteral */;
                case 10 /* StringLiteral */:
                    return 6 /* stringLiteral */;
                case 13 /* RegularExpressionLiteral */:
                    return 7 /* regularExpressionLiteral */;
                case 7 /* ConflictMarkerTrivia */:
                case 3 /* MultiLineCommentTrivia */:
                case 2 /* SingleLineCommentTrivia */:
                    return 1 /* comment */;
                case 5 /* WhitespaceTrivia */:
                case 4 /* NewLineTrivia */:
                    return 8 /* whiteSpace */;
                case 79 /* Identifier */:
                default:
                    if (isTemplateLiteralKind(token)) {
                        return 6 /* stringLiteral */;
                    }
                    return 2 /* identifier */;
            }
        }