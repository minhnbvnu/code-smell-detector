function advancePastLineBreak() {
                if (position < text.length) {
                    const charCode = text.charCodeAt(position);
                    if (isLineBreak(charCode)) {
                        position++;
                        if (position < text.length && charCode === 13 /* carriageReturn */ && text.charCodeAt(position) === 10 /* lineFeed */) {
                            position++;
                        }
                    }
                }
            }