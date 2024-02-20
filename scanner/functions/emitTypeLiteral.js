function emitTypeLiteral(node) {
                pushPrivateNameGenerationScope(0 /* Auto */, 
                /*newReservedMemberNames*/
                void 0);
                writePunctuation("{");
                const flags = getEmitFlags(node) & 1 /* SingleLine */ ? 768 /* SingleLineTypeLiteralMembers */ : 32897 /* MultiLineTypeLiteralMembers */;
                emitList(node, node.members, flags | 524288 /* NoSpaceIfEmpty */);
                writePunctuation("}");
                popPrivateNameGenerationScope();
            }