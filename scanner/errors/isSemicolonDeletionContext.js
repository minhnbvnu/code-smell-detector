function isSemicolonDeletionContext(context) {
            let nextTokenKind = context.nextTokenSpan.kind;
            let nextTokenStart = context.nextTokenSpan.pos;
            if (isTrivia(nextTokenKind)) {
                const nextRealToken = context.nextTokenParent === context.currentTokenParent ? findNextToken(context.currentTokenParent, findAncestor(context.currentTokenParent, (a) => !a.parent), context.sourceFile) : context.nextTokenParent.getFirstToken(context.sourceFile);
                if (!nextRealToken) {
                    return true;
                }
                nextTokenKind = nextRealToken.kind;
                nextTokenStart = nextRealToken.getStart(context.sourceFile);
            }
            const startLine = context.sourceFile.getLineAndCharacterOfPosition(context.currentTokenSpan.pos).line;
            const endLine = context.sourceFile.getLineAndCharacterOfPosition(nextTokenStart).line;
            if (startLine === endLine) {
                return nextTokenKind === 19 /* CloseBraceToken */ || nextTokenKind === 1 /* EndOfFileToken */;
            }
            if (nextTokenKind === 237 /* SemicolonClassElement */ || nextTokenKind === 26 /* SemicolonToken */) {
                return false;
            }
            if (context.contextNode.kind === 261 /* InterfaceDeclaration */ || context.contextNode.kind === 262 /* TypeAliasDeclaration */) {
                return !isPropertySignature(context.currentTokenParent) || !!context.currentTokenParent.type || nextTokenKind !== 20 /* OpenParenToken */;
            }
            if (isPropertyDeclaration(context.currentTokenParent)) {
                return !context.currentTokenParent.initializer;
            }
            return context.currentTokenParent.kind !== 245 /* ForStatement */ && context.currentTokenParent.kind !== 239 /* EmptyStatement */ && context.currentTokenParent.kind !== 237 /* SemicolonClassElement */ && nextTokenKind !== 22 /* OpenBracketToken */ && nextTokenKind !== 20 /* OpenParenToken */ && nextTokenKind !== 39 /* PlusToken */ && nextTokenKind !== 40 /* MinusToken */ && nextTokenKind !== 43 /* SlashToken */ && nextTokenKind !== 13 /* RegularExpressionLiteral */ && nextTokenKind !== 27 /* CommaToken */ && nextTokenKind !== 225 /* TemplateExpression */ && nextTokenKind !== 15 /* TemplateHead */ && nextTokenKind !== 14 /* NoSubstitutionTemplateLiteral */ && nextTokenKind !== 24 /* DotToken */;
        }