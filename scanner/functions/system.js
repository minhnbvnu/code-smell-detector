function system(command)
    {
        var c_cmd = ffi.cstr(command);
        var result = c.system(c_cmd);
        c.free(c_cmd);
        return result;
    }