function getModifiedReadonlyState(state, modifiers) {
                return modifiers & 1 /* IncludeReadonly */ ? true : modifiers & 2 /* ExcludeReadonly */ ? false : state;
            }