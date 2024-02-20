function recordReplace(start, len, newText) {
                if (len || newText) {
                    edits.push(createTextChangeFromStartLength(start, len, newText));
                }
            }