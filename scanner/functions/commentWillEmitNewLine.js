function commentWillEmitNewLine(node) {
                return node.kind === 2 /* SingleLineCommentTrivia */ || !!node.hasTrailingNewLine;
            }