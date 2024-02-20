function swapCase(s) {
                            return s.replace(/\w/g, (ch) => {
                                const up = ch.toUpperCase();
                                return ch === up ? ch.toLowerCase() : up;
                            });
                        }