function getModifierKindFromSource(source, kind) {
            return canHaveModifiers(source) ? filter(source.modifiers, (modifier) => modifier.kind === kind) : void 0;
        }