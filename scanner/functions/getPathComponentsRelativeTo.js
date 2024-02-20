function getPathComponentsRelativeTo(from, to, stringEqualityComparer, getCanonicalFileName) {
            const fromComponents = reducePathComponents(getPathComponents(from));
            const toComponents = reducePathComponents(getPathComponents(to));
            let start;
            for (start = 0; start < fromComponents.length && start < toComponents.length; start++) {
                const fromComponent = getCanonicalFileName(fromComponents[start]);
                const toComponent = getCanonicalFileName(toComponents[start]);
                const comparer = start === 0 ? equateStringsCaseInsensitive : stringEqualityComparer;
                if (!comparer(fromComponent, toComponent))
                    break;
            }
            if (start === 0) {
                return toComponents;
            }
            const components = toComponents.slice(start);
            const relative = [];
            for (; start < fromComponents.length; start++) {
                relative.push("..");
            }
            return ["", ...relative, ...components];
        }