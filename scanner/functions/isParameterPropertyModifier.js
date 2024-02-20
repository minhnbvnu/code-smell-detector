function isParameterPropertyModifier(kind) {
            return !!(modifierToFlag(kind) & 16476 /* ParameterPropertyModifier */);
        }