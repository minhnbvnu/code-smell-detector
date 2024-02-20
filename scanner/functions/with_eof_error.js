function with_eof_error(eof_error, cont) {
                return function (x) {
                    try {
                        return cont(x);
                    }
                    catch (ex) {
                        if (ex === EX_EOF)
                            parse_error(eof_error);
                        else
                            throw ex;
                    }
                };
            }