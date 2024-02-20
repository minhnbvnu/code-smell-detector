function parseOptionalToken(t) {
                        if (token() === t) {
                            return parseTokenNode();
                        }
                        return void 0;
                    }