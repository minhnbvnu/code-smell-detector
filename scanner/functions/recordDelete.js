function recordDelete(start, len) {
                if (len) {
                    edits.push(createTextChangeFromStartLength(start, len, ""));
                }
            }