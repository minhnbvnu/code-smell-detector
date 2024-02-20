function perror(msg)
    {
        var c_msg = ffi.cstr(msg);
        c.perror(c_msg);
        c.free(c_msg);
        return;
    }