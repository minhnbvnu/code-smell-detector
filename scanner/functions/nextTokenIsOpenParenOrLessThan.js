function nextTokenIsOpenParenOrLessThan() {
                        nextToken();
                        return token() === 20 /* OpenParenToken */ || token() === 29 /* LessThanToken */;
                    }