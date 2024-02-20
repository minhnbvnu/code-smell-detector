function nextTokenIsOnSameLineAndCanFollowModifier() {
                        nextToken();
                        if (scanner2.hasPrecedingLineBreak()) {
                            return false;
                        }
                        return canFollowModifier();
                    }