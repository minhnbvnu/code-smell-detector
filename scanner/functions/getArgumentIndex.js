function getArgumentIndex(argumentsList, node) {
            let argumentIndex = 0;
            for (const child of argumentsList.getChildren()) {
                if (child === node) {
                    break;
                }
                if (child.kind !== 27 /* CommaToken */) {
                    argumentIndex++;
                }
            }
            return argumentIndex;
        }