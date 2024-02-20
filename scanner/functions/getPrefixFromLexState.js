function getPrefixFromLexState(lexState) {
            switch (lexState) {
                case 3 /* InDoubleQuoteStringLiteral */:
                    return { prefix: '"\\\n' };
                case 2 /* InSingleQuoteStringLiteral */:
                    return { prefix: "'\\\n" };
                case 1 /* InMultiLineCommentTrivia */:
                    return { prefix: "/*\n" };
                case 4 /* InTemplateHeadOrNoSubstitutionTemplate */:
                    return { prefix: "`\n" };
                case 5 /* InTemplateMiddleOrTail */:
                    return { prefix: "}\n", pushTemplate: true };
                case 6 /* InTemplateSubstitutionPosition */:
                    return { prefix: "", pushTemplate: true };
                case 0 /* None */:
                    return { prefix: "" };
                default:
                    return Debug.assertNever(lexState);
            }
        }