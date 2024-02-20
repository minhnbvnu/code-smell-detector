function emitSignatureAndBody(node, emitSignatureHead2) {
                const body = node.body;
                if (body) {
                    if (isBlock(body)) {
                        const indentedFlag = getEmitFlags(node) & 131072 /* Indented */;
                        if (indentedFlag) {
                            increaseIndent();
                        }
                        pushNameGenerationScope(node);
                        forEach(node.parameters, generateNames);
                        generateNames(node.body);
                        emitSignatureHead2(node);
                        emitBlockFunctionBody(body);
                        popNameGenerationScope(node);
                        if (indentedFlag) {
                            decreaseIndent();
                        }
                    }
                    else {
                        emitSignatureHead2(node);
                        writeSpace();
                        emitExpression(body, parenthesizer.parenthesizeConciseBodyOfArrowFunction);
                    }
                }
                else {
                    emitSignatureHead2(node);
                    writeTrailingSemicolon();
                }
            }