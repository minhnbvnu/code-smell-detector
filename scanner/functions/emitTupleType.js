function emitTupleType(node) {
                emitTokenWithComment(22 /* OpenBracketToken */, node.pos, writePunctuation, node);
                const flags = getEmitFlags(node) & 1 /* SingleLine */ ? 528 /* SingleLineTupleTypeElements */ : 657 /* MultiLineTupleTypeElements */;
                emitList(node, node.elements, flags | 524288 /* NoSpaceIfEmpty */, parenthesizer.parenthesizeElementTypeOfTupleType);
                emitTokenWithComment(23 /* CloseBracketToken */, node.elements.end, writePunctuation, node);
            }