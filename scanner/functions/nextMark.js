function nextMark() {
                    if (marked) {
                        markpos += 1;
                        mark = (markpos < marked.length) ? marked[markpos] : null;
                    }
                }