function isValidFunctionBody(body) 
    {
        var i = 0;
        var brackets = 0;
        while (i < body.length)
        {
            var current = body.charAt(i);
            switch (current)
            {
                case '"':
                case "'":
                    i = skipString(body, current, i + 1);
                    break;
                case '/':
                    var lookAhead = body.charAt(i + 1)
                    if (lookAhead == '/')
                        i = skipLineComment(body, i + 2);
                    else if (lookAhead == '*')
                        i = skipBlockComment(body, i + 2);
                    break;
                case '{':
                    ++brackets;
                    ++i;
                    break;
                case '}':
                    --brackets;
                    if (brackets < 0)
                        throw new SyntaxError('Unexpected }');
                    ++i;
                    break;
                default:
                    ++i;
            }
        }

        return brackets === 0;
    }