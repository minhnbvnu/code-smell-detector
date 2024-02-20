function skipString(body, quote, i)
    {
        while (i < body.length) {
            var current = body.charAt(i);
            switch (current)
            {
                case quote:
                    return i + 1;
                case '\\':
                    ++i;
                    break;
                case '\r':
                case '\n':
                    throw new SyntaxError('Unterminated string literal');
            }
            ++i;
        }

        throw new SyntaxError('Unterminated string literal');
    }