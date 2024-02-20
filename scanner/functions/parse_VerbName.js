function parse_VerbName() {
                var result0;

                result0 = parse_GetFrom();
                if (result0 === null) {
                    result0 = parse_PostTo();
                    if (result0 === null) {
                        result0 = parse_PutTo();
                        if (result0 === null) {
                            result0 = parse_Delete();
                            if (result0 === null) {
                                result0 = parse_Patch();
                            }
                        }
                    }
                }
                return result0;
            }