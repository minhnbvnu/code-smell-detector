function containsPath(parent2, child, currentDirectory, ignoreCase) {
            if (typeof currentDirectory === "string") {
                parent2 = combinePaths(currentDirectory, parent2);
                child = combinePaths(currentDirectory, child);
            }
            else if (typeof currentDirectory === "boolean") {
                ignoreCase = currentDirectory;
            }
            if (parent2 === void 0 || child === void 0)
                return false;
            if (parent2 === child)
                return true;
            const parentComponents = reducePathComponents(getPathComponents(parent2));
            const childComponents = reducePathComponents(getPathComponents(child));
            if (childComponents.length < parentComponents.length) {
                return false;
            }
            const componentEqualityComparer = ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive;
            for (let i = 0; i < parentComponents.length; i++) {
                const equalityComparer = i === 0 ? equateStringsCaseInsensitive : componentEqualityComparer;
                if (!equalityComparer(parentComponents[i], childComponents[i])) {
                    return false;
                }
            }
            return true;
        }