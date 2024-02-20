function hasRestParameter(s) {
            const last2 = lastOrUndefined(s.parameters);
            return !!last2 && isRestParameter(last2);
        }