function getMinTypeArgumentCount(typeParameters) {
                let minTypeArgumentCount = 0;
                if (typeParameters) {
                    for (let i = 0; i < typeParameters.length; i++) {
                        if (!hasTypeParameterDefault(typeParameters[i])) {
                            minTypeArgumentCount = i + 1;
                        }
                    }
                }
                return minTypeArgumentCount;
            }