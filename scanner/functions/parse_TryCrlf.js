function parse_TryCrlf() {
                var result0;

                result0 = parse_ThrowCrlf();
                if (result0 === null) {
                    result0 = parse_ClauseCrlf();
                }
                return result0;
            }