function CDec(base)
    {
        var dec = {
            wrapper : 'CDec'
        };

        if (base)
            dec.type = base.type;

        return dec;
    }