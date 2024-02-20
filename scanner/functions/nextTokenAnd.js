function nextTokenAnd(func) {
                        nextToken();
                        return func();
                    }