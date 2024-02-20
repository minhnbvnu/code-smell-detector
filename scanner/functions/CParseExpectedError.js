function CParseExpectedError(expected, got, at)
    {
        var message;
        this.name = 'CParseExpectedError';

        if (expected)
        {
            expected = (typeof expected === 'number') ?
                '\'' + String.fromCharCode(expected) + '\'' : expected;
            message = 'Expected: ' + expected;

            if (got === 0)
            {
                message += ' Got EOF';
            }
            else if (got)
            {
                got = (typeof got === 'number') ?
                    String.fromCharCode(got) : got;
                message += ' Got: \'' + got + '\'';
            }

            if (at)
                message += at;

            this.message = message;
        }
    }