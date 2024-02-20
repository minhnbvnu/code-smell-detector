function recordInsert(start, text) {
                if (text) {
                    edits.push(createTextChangeFromStartLength(start, 0, text));
                }
            }