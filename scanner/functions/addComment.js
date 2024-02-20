function addComment(s) {
                if (comment) {
                    if (s.match(/^https?$/)) {
                        return [textPart(s), ...getDisplayPartsFromComment(comment, checker)];
                    }
                    else {
                        return [namePart(s), spacePart(), ...getDisplayPartsFromComment(comment, checker)];
                    }
                }
                else {
                    return [textPart(s)];
                }
            }