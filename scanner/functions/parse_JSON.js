function parse_JSON() {
                var result0;

                result0 = parse_Object();
                if (result0 === null) {
                    result0 = parse_StringVal();
                    if (result0 === null) {
                        result0 = parse_NumberVal();
                        if (result0 === null) {
                            result0 = parse_ArrayVal();
                            if (result0 === null) {
                                result0 = parse_TrueVal();
                                if (result0 === null) {
                                    result0 = parse_FalseVal();
                                    if (result0 === null) {
                                        result0 = parse_NullVal();
                                    }
                                }
                            }
                        }
                    }
                }
                return result0;
            }