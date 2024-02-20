function parseTypeMember() {
                        if (token() === 20 /* OpenParenToken */ || token() === 29 /* LessThanToken */) {
                            return parseSignatureMember(176 /* CallSignature */);
                        }
                        if (token() === 103 /* NewKeyword */ && lookAhead(nextTokenIsOpenParenOrLessThan)) {
                            return parseSignatureMember(177 /* ConstructSignature */);
                        }
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const modifiers = parseModifiers(
                        /*allowDecorators*/
                        false);
                        if (parseContextualModifier(137 /* GetKeyword */)) {
                            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, 174 /* GetAccessor */, 4 /* Type */);
                        }
                        if (parseContextualModifier(151 /* SetKeyword */)) {
                            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, 175 /* SetAccessor */, 4 /* Type */);
                        }
                        if (isIndexSignature()) {
                            return parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers);
                        }
                        return parsePropertyOrMethodSignature(pos, hasJSDoc, modifiers);
                    }