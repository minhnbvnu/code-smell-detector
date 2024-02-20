function parseOptional(t) {
                        if (token() === t) {
                            nextToken();
                            return true;
                        }
                        return false;
                    }