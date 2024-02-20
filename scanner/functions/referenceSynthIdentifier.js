function referenceSynthIdentifier(synthId) {
            synthId.hasBeenReferenced = true;
            return synthId.identifier;
        }