function isExternalModuleReference2() {
                        return token() === 147 /* RequireKeyword */ && lookAhead(nextTokenIsOpenParen);
                    }