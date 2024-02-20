function declareSynthIdentifier(synthId) {
            synthId.hasBeenDeclared = true;
            return synthId.identifier;
        }