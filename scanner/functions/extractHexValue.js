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