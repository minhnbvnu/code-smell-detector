function FFILib(name)
    {
        var lib = Object.create(FFILibProto);
        var ct = Object.create(CTypes);
        lib.parser = Object.create(Parser);
        lib.lexer = Object.create(Lexer);
        lib.ctypes = ct;
        lib.CType = lib.parser.CType = CTypeFun(ct);

        // Pass null to create a dummy library
        if (name !== null)
            lib.ptr = $ir_load_lib(name);

        return lib;
    }