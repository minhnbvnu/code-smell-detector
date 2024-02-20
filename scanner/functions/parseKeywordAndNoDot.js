function parseKeywordAndNoDot() {
                        const node = parseTokenNode();
                        return token() === 24 /* DotToken */ ? void 0 : node;
                    }