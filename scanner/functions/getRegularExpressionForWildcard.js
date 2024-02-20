function getRegularExpressionForWildcard(specs, basePath, usage) {
            const patterns = getRegularExpressionsForWildcards(specs, basePath, usage);
            if (!patterns || !patterns.length) {
                return void 0;
            }
            const pattern = patterns.map((pattern2) => `(${pattern2})`).join("|");
            const terminator = usage === "exclude" ? "($|/)" : "$";
            return `^(${pattern})${terminator}`;
        }