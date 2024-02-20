function replaceToken(token, idx, str) {
                        // save token to res
                        const refId = res.push(token.slice(bracket[0].length, -bracket[1].length)) - 1;

                        ids.push(refId);

                        return escape + refId + escape;
                    }