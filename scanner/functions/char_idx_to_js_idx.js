function char_idx_to_js_idx (char_idx, text) {
        var js_idx = char_idx;
        for (var i = 0; i + 1 < text.length && i < js_idx; i++) {
            var char_code = text.charCodeAt(i);
            // check for surrogate pair
            if (char_code >= 0xD800 && char_code <= 0xDBFF) {
                var next_char_code = text.charCodeAt(i+1);
                if (next_char_code >= 0xDC00 && next_char_code <= 0xDFFF) {
                    js_idx++;
                    i++;
                }
            }
        }
        return js_idx;
    }