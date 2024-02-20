function parseTrailingTagComments(pos, end2, margin, indentText) {
                                if (!indentText) {
                                    margin += end2 - pos;
                                }
                                return parseTagComments(margin, indentText.slice(margin));
                            }