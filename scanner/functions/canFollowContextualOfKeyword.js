function canFollowContextualOfKeyword() {
                        return nextTokenIsIdentifier() && nextToken() === 21 /* CloseParenToken */;
                    }