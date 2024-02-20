function countMessageChainBreadth(info) {
                        if (!info)
                            return 0;
                        return reduceLeft(info, (value, chain) => value + 1 + countMessageChainBreadth(chain.next), 0);
                    }