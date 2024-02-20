function decode_template(str) {
        var malformed = false;
        str = str.replace(/\\(u\{[^{}]*\}?|u[\s\S]{0,4}|x[\s\S]{0,2}|[0-9]+|[\s\S])/g, function(match, seq) {
            var ch = decode_escape_sequence(seq);
            if (typeof ch == "string") return ch;
            malformed = true;
        });
        if (!malformed) return str;
    }