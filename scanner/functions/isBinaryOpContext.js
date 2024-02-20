function isBinaryOpContext(context) {
            switch (context.contextNode.kind) {
                case 223 /* BinaryExpression */:
                    return context.contextNode.operatorToken.kind !== 27 /* CommaToken */;
                case 224 /* ConditionalExpression */:
                case 191 /* ConditionalType */:
                case 231 /* AsExpression */:
                case 278 /* ExportSpecifier */:
                case 273 /* ImportSpecifier */:
                case 179 /* TypePredicate */:
                case 189 /* UnionType */:
                case 190 /* IntersectionType */:
                case 235 /* SatisfiesExpression */:
                    return true;
                case 205 /* BindingElement */:
                case 262 /* TypeAliasDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                case 274 /* ExportAssignment */:
                case 257 /* VariableDeclaration */:
                case 166 /* Parameter */:
                case 302 /* EnumMember */:
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                    return context.currentTokenSpan.kind === 63 /* EqualsToken */ || context.nextTokenSpan.kind === 63 /* EqualsToken */;
                case 246 /* ForInStatement */:
                case 165 /* TypeParameter */:
                    return context.currentTokenSpan.kind === 101 /* InKeyword */ || context.nextTokenSpan.kind === 101 /* InKeyword */ || context.currentTokenSpan.kind === 63 /* EqualsToken */ || context.nextTokenSpan.kind === 63 /* EqualsToken */;
                case 247 /* ForOfStatement */:
                    return context.currentTokenSpan.kind === 162 /* OfKeyword */ || context.nextTokenSpan.kind === 162 /* OfKeyword */;
            }
            return false;
        }