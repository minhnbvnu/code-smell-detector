function createSynthBindingPattern(bindingPattern, elements = emptyArray, types = []) {
            return { kind: 1 /* BindingPattern */, bindingPattern, elements, types };
        }