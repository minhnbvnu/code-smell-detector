function emitBlockStatements(node, forceSingleLine) {
                emitTokenWithComment(18 /* OpenBraceToken */, node.pos, writePunctuation, 
                /*contextNode*/
                node);
                const format = forceSingleLine || getEmitFlags(node) & 1 /* SingleLine */ ? 768 /* SingleLineBlockStatements */ : 129 /* MultiLineBlockStatements */;
                emitList(node, node.statements, format);
                emitTokenWithComment(19 /* CloseBraceToken */, node.statements.end, writePunctuation, 
                /*contextNode*/
                node, 
                /*indentLeading*/
                !!(format & 1 /* MultiLine */));
            }