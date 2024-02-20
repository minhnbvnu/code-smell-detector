function isFunctionLikeButNotConstructor(kind) {
                return isFunctionLikeKind(kind) && kind !== 173 /* Constructor */;
            }