function decodeEntities(text) {
                return text.replace(/&((#((\d+)|x([\da-fA-F]+)))|(\w+));/g, (match, _all, _number, _digits, decimal, hex, word) => {
                    if (decimal) {
                        return utf16EncodeAsString(parseInt(decimal, 10));
                    }
                    else if (hex) {
                        return utf16EncodeAsString(parseInt(hex, 16));
                    }
                    else {
                        const ch = entities.get(word);
                        return ch ? utf16EncodeAsString(ch) : match;
                    }
                });
            }