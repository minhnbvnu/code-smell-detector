function skipLineComment(body, i)
    {
        while (i < body.length) {
            var current = body.charAt(i);
            if (current === '\n' || current === '\r')
                return i + 1;
            ++i;
        }

        return i;
    }