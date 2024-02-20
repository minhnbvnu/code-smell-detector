function abortParsingListOrMoveToNextToken(kind) {
                        parsingContextErrors(kind);
                        if (isInSomeParsingContext()) {
                            return true;
                        }
                        nextToken();
                        return false;
                    }