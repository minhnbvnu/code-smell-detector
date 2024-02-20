function isFunctionLikeBodyKeyword(kind) {
            return kind === 132 /* AsyncKeyword */ || kind === 133 /* AwaitKeyword */ || kind === 128 /* AsKeyword */ || kind === 150 /* SatisfiesKeyword */ || kind === 154 /* TypeKeyword */ || !isContextualKeyword(kind) && !isClassMemberCompletionKeyword(kind);
        }