function removeLeadingNewlines(comments2) {
                                while (comments2.length && (comments2[0] === "\n" || comments2[0] === "\r")) {
                                    comments2.shift();
                                }
                            }