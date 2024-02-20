function skipBlockComment(body, i)
    {
        while (i < body.length)
        {
            var current   = body.charAt(i);
            var lookAhead = body.charAt(i + 1);
            if (current === '*' && lookAhead === '/')
                return i + 2;
            ++i;
        }

        throw new SyntaxError('Unterminated block comment');
    }