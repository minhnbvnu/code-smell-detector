function parseFunctionBlockOrSemicolon(flags, diagnosticMessage) {
                        if (token() !== 18 /* OpenBraceToken */) {
                            if (flags & 4 /* Type */) {
                                parseTypeMemberSemicolon();
                                return;
                            }
                            if (canParseSemicolon()) {
                                parseSemicolon();
                                return;
                            }
                        }
                        return parseFunctionBlock(flags, diagnosticMessage);
                    }