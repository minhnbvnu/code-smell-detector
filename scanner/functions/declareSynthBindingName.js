function declareSynthBindingName(synthName) {
            return isSynthIdentifier(synthName) ? declareSynthIdentifier(synthName) : declareSynthBindingPattern(synthName);
        }