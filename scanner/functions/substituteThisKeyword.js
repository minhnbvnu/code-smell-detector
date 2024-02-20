function substituteThisKeyword(node) {
                if (enabledSubstitutions & 1 /* CapturedThis */ && hierarchyFacts & 16 /* CapturesThis */) {
                    return setTextRange(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */), node);
                }
                return node;
            }