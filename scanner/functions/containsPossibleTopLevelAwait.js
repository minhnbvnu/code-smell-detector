function containsPossibleTopLevelAwait(node) {
                            return !(node.flags & 32768 /* AwaitContext */) && !!(node.transformFlags & 67108864 /* ContainsPossibleTopLevelAwait */);
                        }