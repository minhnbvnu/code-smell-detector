function CParseError(message, at)
    {
        this.name = 'CParseError';
        this.message = message || 'error parsing c declaration';
        if (at)
            this.message += at;
    }