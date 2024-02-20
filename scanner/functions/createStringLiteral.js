function createStringLiteral(text, isSingleQuote, hasExtendedUnicodeEscape) {
                const node = createBaseStringLiteral(text, isSingleQuote);
                node.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
                if (hasExtendedUnicodeEscape)
                    node.transformFlags |= 1024 /* ContainsES2015 */;
                return node;
            }