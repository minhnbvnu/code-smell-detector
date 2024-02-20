function getPatternFromSpec(spec, basePath, usage) {
            const pattern = spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]);
            return pattern && `^(${pattern})${usage === "exclude" ? "($|/)" : "$"}`;
        }