function getUnquotedKey(key) {
                return key.type === "Identifier" ? key.name : key.value;
            }