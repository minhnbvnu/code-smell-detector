function getNullableSymbolOriginInfoKind(kind) {
                    return insertQuestionDot ? kind | 16 /* Nullable */ : kind;
                }