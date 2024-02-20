function nextTokenIsOpenParenOrLessThanOrDot() {
                        switch (nextToken()) {
                            case 20 /* OpenParenToken */:
                            case 29 /* LessThanToken */:
                            case 24 /* DotToken */:
                                return true;
                        }
                        return false;
                    }