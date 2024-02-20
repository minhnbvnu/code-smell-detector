function FilteredInput(r, predicate)
    {
        if (!(this instanceof FilteredInput))
            return new FilteredInput(r, predicate);
        this._r = r;
        this._predicate = predicate;
    }