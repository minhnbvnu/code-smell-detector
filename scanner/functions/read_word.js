function read_word() {
                var word = read_name();
                if (prev_was_dot)
                    return token("name", word);
                return KEYWORDS_ATOM.has(word) ? token("atom", word)
                    : !KEYWORDS.has(word) ? token("name", word)
                        : OPERATORS.has(word) ? token("operator", word)
                            : token("keyword", word);
            }