function reducePathComponents(components) {
            if (!some(components))
                return [];
            const reduced = [components[0]];
            for (let i = 1; i < components.length; i++) {
                const component = components[i];
                if (!component)
                    continue;
                if (component === ".")
                    continue;
                if (component === "..") {
                    if (reduced.length > 1) {
                        if (reduced[reduced.length - 1] !== "..") {
                            reduced.pop();
                            continue;
                        }
                    }
                    else if (reduced[0])
                        continue;
                }
                reduced.push(component);
            }
            return reduced;
        }