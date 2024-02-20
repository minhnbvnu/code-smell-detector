function decodeURI(encodedURI)
{
    // Parse and returns a 2 characters hexadecimal value in the string
    // at a given position.
    function extractHexValue (
        str,
        pos
    )
    {
        var value = 0, i = pos;

        for (; i < pos + 2; ++i)
        {
            var hc = str.charCodeAt(i);

            if (hc >= 97 && hc <= 102) // a-f
                value = (value * 16) + (hc - 87);
            else if (hc >= 65 && hc <= 70) // A-F
                value = (value * 16) + (hc - 55);
            else if (hc >= 48 && hc <= 57) // 0-9
                value = (value * 16) + (hc - 48);
            else
                return null;
        }
        return value;
    }

    var decodedURIParts = new Array();
    var j = 0;

    for (var i = 0; i < encodedURI.length;)
    {
        while (i < encodedURI.length &&
               encodedURI.charCodeAt(i) !== 37) // '%'
           ++i;

        if (i < encodedURI.length)
        {
            if (j < i)
                decodedURIParts.push(encodedURI.substring(j, i));

            // Parse first byte
            if (i + 2 >= encodedURI.length)
                // FIXME: must throw URIError.
                return null;

            var cbyte = extractHexValue(encodedURI, i + 1);

            if (cbyte === null)
                // FIXME: must throw URIError.
                return null;

            i += 3;
            var bytes = [ cbyte ];
            var bytesToRead;

            if ((cbyte & 0x80) === 0x00)
                bytesToRead = 0;
            else if ((cbyte & 0xE0) === 0xC0)
                bytesToRead = 1;
            else if ((cbyte & 0xF0) === 0xE0)
                bytesToRead = 2;
            else if ((cbyte & 0xF8) === 0xF0)
                bytesToRead = 3;

            for (var k = 0; k < bytesToRead; k++)
            {
                // Check for valid %XX hexadecimal form on current position of value 10xxxxxx
                if (i + 2 >= encodedURI.length ||
                    encodedURI.charCodeAt(i) !== 37 ||
                    (cbyte = extractHexValue(encodedURI, i + 1)) === null ||
                    cbyte < 0x80 || cbyte > 0xBF)
                    // FIXME: must throw URIError.
                    return null;

                i += 3;
                bytes.push(cbyte);
            }

            // Ref. Table 21 ECMA-262
            switch (bytesToRead)
            {
                case 0:
                decodedURIParts.push(String.fromCharCode(bytes[0]));
                break;

                case 1:
                var charCode = ((bytes[0] & 0x1F) << 6) + (bytes[1] & 0x3F);
                decodedURIParts.push(String.fromCharCode(charCode));
                break;

                case 2:
                var charCode = ((bytes[0] & 0x0F) << 12) +
                               ((bytes[1] & 0x3F) << 6) +
                               (bytes[2] & 0x3F);
                decodedURIParts.push(String.fromCharCode(charCode));
                break;

                case 3:
                var u = ((bytes[0] & 0x7) << 2) | ((bytes[1] & 0x30) >> 4);
                var charCode1 = 0xD800 | ((u - 1) << 6) | ((bytes[1] & 0xF) << 2) | ((bytes[2] & 0x30) >> 4);
                var charCode2 = 0xDC00 | ((bytes[2] & 0xF) << 6) | (bytes[3] & 0x3F);

                decodedURIParts.push(String.fromCharCode(charCode1));
                decodedURIParts.push(String.fromCharCode(charCode2));
                break;
            }

            j = i;
        }
    }

    return decodedURIParts.join("");
}