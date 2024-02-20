function parse_delimited_string(text) {
        for (const delim of delimiters) {
            const n0 = text.indexOf(delim.start);
            const m0 = n0 + delim.start.length;
            if (n0 == 0) {
                const n1 = text.indexOf(delim.end, m0);
                const m1 = n1;
                if (n1 == text.length - delim.end.length)
                    return new math_text_1.TeX({ text: text.slice(m0, m1), inline: delim.inline });
                else
                    break;
            }
        }
        return new plain_text_1.PlainText({ text });
    }