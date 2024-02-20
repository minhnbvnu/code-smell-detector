function canFollowExportModifier() {
                        return token() === 59 /* AtToken */ || token() !== 41 /* AsteriskToken */ && token() !== 128 /* AsKeyword */ && token() !== 18 /* OpenBraceToken */ && canFollowModifier();
                    }