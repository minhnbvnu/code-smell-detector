function getTemplateLiteralRawText(kind) {
                        const isLast = kind === 14 /* NoSubstitutionTemplateLiteral */ || kind === 17 /* TemplateTail */;
                        const tokenText = scanner2.getTokenText();
                        return tokenText.substring(1, tokenText.length - (scanner2.isUnterminated() ? 0 : isLast ? 1 : 2));
                    }