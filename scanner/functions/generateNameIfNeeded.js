function generateNameIfNeeded(name) {
                if (name) {
                    if (isGeneratedIdentifier(name) || isGeneratedPrivateIdentifier(name)) {
                        generateName(name);
                    }
                    else if (isBindingPattern(name)) {
                        generateNames(name);
                    }
                }
            }