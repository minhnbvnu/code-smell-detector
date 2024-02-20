function declareSynthBindingPattern(synthPattern) {
            for (const element of synthPattern.elements) {
                declareSynthBindingName(element);
            }
            return synthPattern.bindingPattern;
        }