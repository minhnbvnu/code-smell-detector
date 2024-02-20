function CParseUnexpectedError(unexpected, got, at)
    {
        var message;
        this.name = 'CParseUnexpectedError';
        if (unexpected)
        {
            message = 'Unexpected: ' + unexpected + ' near ';

            if (got)
            {
                got = (typeof got === 'number') ?
                    '\'' + String.fromCharCode(got) + '\'' : got;
                message += ' - \'' + got + '\'';
            }

            if (at)
                message += at;

            this.message = message;
        }
    }