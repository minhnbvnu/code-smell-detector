function parseOptionalTokenJSDoc(t) {
                        if (token() === t) {
                            return parseTokenNodeJSDoc();
                        }
                        return void 0;
                    }