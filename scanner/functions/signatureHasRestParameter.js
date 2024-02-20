function signatureHasRestParameter(s) {
            return !!(s.flags & 1 /* HasRestParameter */);
        }