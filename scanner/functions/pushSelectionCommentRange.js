function pushSelectionCommentRange(start, end) {
                pushSelectionRange(start, end);
                let pos2 = start;
                while (sourceFile.text.charCodeAt(pos2) === 47 /* slash */) {
                    pos2++;
                }
                pushSelectionRange(pos2, end);
            }