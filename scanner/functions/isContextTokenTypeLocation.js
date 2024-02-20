function isContextTokenTypeLocation(contextToken2) {
                if (contextToken2) {
                    const parentKind = contextToken2.parent.kind;
                    switch (contextToken2.kind) {
                        case 58 /* ColonToken */:
                            return parentKind === 169 /* PropertyDeclaration */ || parentKind === 168 /* PropertySignature */ || parentKind === 166 /* Parameter */ || parentKind === 257 /* VariableDeclaration */ || isFunctionLikeKind(parentKind);
                        case 63 /* EqualsToken */:
                            return parentKind === 262 /* TypeAliasDeclaration */;
                        case 128 /* AsKeyword */:
                            return parentKind === 231 /* AsExpression */;
                        case 29 /* LessThanToken */:
                            return parentKind === 180 /* TypeReference */ || parentKind === 213 /* TypeAssertionExpression */;
                        case 94 /* ExtendsKeyword */:
                            return parentKind === 165 /* TypeParameter */;
                        case 150 /* SatisfiesKeyword */:
                            return parentKind === 235 /* SatisfiesExpression */;
                    }
                }
                return false;
            }