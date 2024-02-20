function tryParseModifier(hasSeenStaticModifier, permitConstAsModifier, stopOnStartOfClassStaticBlock) {
                        const pos = getNodePos();
                        const kind = token();
                        if (token() === 85 /* ConstKeyword */ && permitConstAsModifier) {
                            if (!tryParse(nextTokenIsOnSameLineAndCanFollowModifier)) {
                                return void 0;
                            }
                        }
                        else if (stopOnStartOfClassStaticBlock && token() === 124 /* StaticKeyword */ && lookAhead(nextTokenIsOpenBrace)) {
                            return void 0;
                        }
                        else if (hasSeenStaticModifier && token() === 124 /* StaticKeyword */) {
                            return void 0;
                        }
                        else {
                            if (!parseAnyContextualModifier()) {
                                return void 0;
                            }
                        }
                        return finishNode(factoryCreateToken(kind), pos);
                    }