function nextTokenCanFollowModifier() {
                        switch (token()) {
                            case 85 /* ConstKeyword */:
                                return nextToken() === 92 /* EnumKeyword */;
                            case 93 /* ExportKeyword */:
                                nextToken();
                                if (token() === 88 /* DefaultKeyword */) {
                                    return lookAhead(nextTokenCanFollowDefaultKeyword);
                                }
                                if (token() === 154 /* TypeKeyword */) {
                                    return lookAhead(nextTokenCanFollowExportModifier);
                                }
                                return canFollowExportModifier();
                            case 88 /* DefaultKeyword */:
                                return nextTokenCanFollowDefaultKeyword();
                            case 124 /* StaticKeyword */:
                            case 137 /* GetKeyword */:
                            case 151 /* SetKeyword */:
                                nextToken();
                                return canFollowModifier();
                            default:
                                return nextTokenIsOnSameLineAndCanFollowModifier();
                        }
                    }