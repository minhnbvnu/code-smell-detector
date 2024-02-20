function createSynthIdentifier(identifier, types = []) {
            return { kind: 0 /* Identifier */, identifier, types, hasBeenDeclared: false, hasBeenReferenced: false };
        }