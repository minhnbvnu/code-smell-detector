function isAmbient() {
                return TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient) || TypeScript.hasFlag(parentModifiers, TypeScript.Modifiers.Ambient);
            }