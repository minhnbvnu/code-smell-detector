function recreateBindingPattern(d) {
                return flatten(mapDefined(d.elements, (e) => recreateBindingElement(e)));
            }