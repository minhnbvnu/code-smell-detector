function parseSignatureMember(kind) {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        if (kind === 177 /* ConstructSignature */) {
                            parseExpected(103 /* NewKeyword */);
                        }
                        const typeParameters = parseTypeParameters();
                        const parameters = parseParameters(4 /* Type */);
                        const type = parseReturnType(58 /* ColonToken */, 
                        /*isType*/
                        true);
                        parseTypeMemberSemicolon();
                        const node = kind === 176 /* CallSignature */ ? factory2.createCallSignature(typeParameters, parameters, type) : factory2.createConstructSignature(typeParameters, parameters, type);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }