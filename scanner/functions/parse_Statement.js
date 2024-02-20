function parse_Statement() {
                var result0;

                result0 = parse_SelectStatement();
                if (result0 === null) {
                    result0 = parse_ShowRoutesStatement();
                    if (result0 === null) {
                        result0 = parse_ShowStatement();
                        if (result0 === null) {
                            result0 = parse_DescribeRouteStatement();
                            if (result0 === null) {
                                result0 = parse_DescribeStatement();
                                if (result0 === null) {
                                    result0 = parse_InsertStatement();
                                    if (result0 === null) {
                                        result0 = parse_DeleteStatement();
                                        if (result0 === null) {
                                            result0 = parse_CreateStatement();
                                            if (result0 === null) {
                                                result0 = parse_UpdateStatement();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return result0;
            }