function MappedInput(r, mapper)
    {
        if (!(this instanceof MappedInput))
            return new MappedInput(r, mapper);
        this._r = r;
        this._mapper = mapper;
    }