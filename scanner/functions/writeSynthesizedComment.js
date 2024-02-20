function writeSynthesizedComment(comment) {
                const text = formatSynthesizedComment(comment);
                const lineMap = comment.kind === 3 /* MultiLineCommentTrivia */ ? computeLineStarts(text) : void 0;
                writeCommentRange(text, lineMap, writer, 0, text.length, newLine);
            }