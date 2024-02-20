function nextTokenIsNewKeyword() {
                        nextToken();
                        return token() === 103 /* NewKeyword */;
                    }