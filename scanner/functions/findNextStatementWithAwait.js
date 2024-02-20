function findNextStatementWithAwait(statements2, start2) {
                            for (let i = start2; i < statements2.length; i++) {
                                if (containsPossibleTopLevelAwait(statements2[i])) {
                                    return i;
                                }
                            }
                            return -1;
                        }