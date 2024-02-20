function for_enum(ctor, init) {
        handle_regexp();
        var obj = expression();
        expect(")");
        return new ctor({
            init   : init,
            object : obj,
            body   : in_loop(statement)
        });
    }