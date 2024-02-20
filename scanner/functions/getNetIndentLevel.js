function getNetIndentLevel(tokens) {
        var level = 0;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (token.type == "keyword") {
                if (token.value in indentKeywords) {
                    level += indentKeywords[token.value];
                }
            } else if (token.type == "paren.lparen") {
                level += token.value.length;
            } else if (token.type == "paren.rparen") {
                level -= token.value.length;
            }
        }
        if (level < 0) {
            return -1;
        } else if (level > 0) {
            return 1;
        } else {
            return 0;
        }
    }