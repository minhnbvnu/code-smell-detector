function removeTrailingWhitespace(comments2) {
                                while (comments2.length && comments2[comments2.length - 1].trim() === "") {
                                    comments2.pop();
                                }
                            }