function _encodeURI(uri, unescapedClassFilter)
{
    var encodedURIParts = [], i = 0, j = 0;

    for (var i = 0; i < uri.length;)
    {
        // Skip unescaped characters.
        while (i < uri.length &&
               unescapedClassFilter(uri.charCodeAt(i)))
           ++i;

        if (i < uri.length)
        {
            // Push skipped substring if needed.
            if (j < i)
                encodedURIParts.push(uri.substring(j, i));

            // Current character has to be escaped.
            var c = uri.charCodeAt(i), v;

            // 15.1.3 .4 .d .i
            if (c >= 0xDC00 && c <= 0xDFFF)
                // FIXME: must throw URIError
                return null;

            if (c < 0xD800 || c > 0xDBFF)
            {
                // Character fit in one 16 bits 
                v = c;
            }
            else
            {
                // Character is 32 bits wide : get next character
                // compose the value of the unicode character.

                if (i + 1 >= uri.length)
                    // FIXME: must throw URIError
                    return null;

                var cnext = uri.charCodeAt(i + 1);

                // Reject invalid values.
                if (cnext < 0xDC00 || cnext > 0xDFFF)
                    // FIXME: must throw URIError
                    return null;

                ++i;

                // Compose character.
                v = (c - 0xD800) * 0x400 + (cnext - 0xDC00) + 0x10000;
            }

            var utfbytes;

            // Encode the character value to an array of bytes following
            // the UTF-8 convention (15.1.3 Table 21)
            if (v < 0x80)
                utfbytes = [v];   
            else if (v < 0x0800)
                utfbytes = [0xC0 | v >> 6, 0x80 | v & 0x3F];
            else if (v < 0x10000)
                utfbytes = [0xE0 | v >> 12, 0x80 | v >> 6 & 0x3F, 0x80 | v & 0x3F];
            else if (v < 0x200000)
                utfbytes = [0xF0 | v >> 18, 0x80 | v >> 12 & 0x3F, 0x80 | v >> 6 & 0x3F, 0x80 | v & 0x3F];

            // Encode the array of bytes to a series of %XX hexadecimal format.
            var utfchars = new Array(utfbytes.length * 3);
            for (var k = 0, l = 0; k < utfbytes.length; ++k, l += 3)
            {
                utfchars[l] = 37; // '%'

                if (((utfbytes[k] & 0xF0) >> 4) < 10)
                    utfchars[l + 1] = ((utfbytes[k] & 0xF0) >> 4) + 48;
                else
                    utfchars[l + 1] = ((utfbytes[k] & 0xF0) >> 4) + 55;

                if ((utfbytes[k] & 0x0F) < 10)
                    utfchars[l + 2] = (utfbytes[k] & 0x0F) + 48;
                else
                    utfchars[l + 2] = (utfbytes[k] & 0x0F) + 55;
            }

            // Push the string in the result.
            encodedURIParts.push(string_internal_fromCharCodeArray(utfchars));
            j = ++i;
        }
    }

    // Push remaining characters of the source string if needed.
    if (j < i)
        encodedURIParts.push(uri.substring(j, i));

    return encodedURIParts.join("");
}