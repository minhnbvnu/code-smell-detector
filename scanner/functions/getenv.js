function getenv(name)
    {
        var c_name = ffi.cstr(name);
        var result = c.getenv(c_name);
        c.free(c_name);
        return ffi.string(result);
    }