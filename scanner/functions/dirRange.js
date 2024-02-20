function dirRange(path)
    {
        path = String(path);

        if (!this instanceof dirRange)
            return new dirRange(path);

        this.path = path;
        this.c_path = ffi.nullPtr;
        this.ptr = ffi.nullPtr;
        this._empty = true;
        return this;
    }