function popen(command, mode)
    {
        var c_mode;
        var c_cmd = ffi.cstr(command);

        if (mode === 'r')
            c_mode = r_mode;
        else if (mode === 'w')
            c_mode = w_mode;
        else
            throw 'Invalid popen mode: ' + mode;

        var streamh = c.popen(c_cmd, c_mode);
        c.free(c_cmd);

        if (ffi.isNullPtr(streamh))
            throw 'Error calling popen with:' + command;

        return io.stream(streamh, 'popen_sh');
    }