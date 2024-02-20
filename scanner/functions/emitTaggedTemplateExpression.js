function emitTaggedTemplateExpression(node) {
                const indirectCall = getInternalEmitFlags(node) & 16 /* IndirectCall */;
                if (indirectCall) {
                    writePunctuation("(");
                    writeLiteral("0");
                    writePunctuation(",");
                    writeSpace();
                }
                emitExpression(node.tag, parenthesizer.parenthesizeLeftSideOfAccess);
                if (indirectCall) {
                    writePunctuation(")");
                }
                emitTypeArguments(node, node.typeArguments);
                writeSpace();
                emitExpression(node.template);
            }