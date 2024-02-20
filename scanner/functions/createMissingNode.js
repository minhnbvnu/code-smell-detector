function createMissingNode(kind, reportAtCurrentPosition, diagnosticMessage, arg0) {
                        if (reportAtCurrentPosition) {
                            parseErrorAtPosition(scanner2.getStartPos(), 0, diagnosticMessage, arg0);
                        }
                        else if (diagnosticMessage) {
                            parseErrorAtCurrentToken(diagnosticMessage, arg0);
                        }
                        const pos = getNodePos();
                        const result = kind === 79 /* Identifier */ ? factoryCreateIdentifier("", 
                        /*originalKeywordKind*/
                        void 0) : isTemplateLiteralKind(kind) ? factory2.createTemplateLiteralLikeNode(kind, "", "", 
                        /*templateFlags*/
                        void 0) : kind === 8 /* NumericLiteral */ ? factoryCreateNumericLiteral("", 
                        /*numericLiteralFlags*/
                        void 0) : kind === 10 /* StringLiteral */ ? factoryCreateStringLiteral("", 
                        /*isSingleQuote*/
                        void 0) : kind === 279 /* MissingDeclaration */ ? factory2.createMissingDeclaration() : factoryCreateToken(kind);
                        return finishNode(result, pos);
                    }