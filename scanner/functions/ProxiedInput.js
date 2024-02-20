function ProxiedInput(r)
    {
        if (!(this instanceof ProxiedInput))
            return new ProxiedInput(r);

        // TODO: error/arg checking
        this._r = r;
    }