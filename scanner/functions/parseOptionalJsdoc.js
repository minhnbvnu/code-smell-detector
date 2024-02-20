function parseOptionalJsdoc(t) {
                                if (token() === t) {
                                    nextTokenJSDoc();
                                    return true;
                                }
                                return false;
                            }