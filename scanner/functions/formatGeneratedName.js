function formatGeneratedName(privateName, prefix, baseName, suffix, generateName) {
            prefix = formatGeneratedNamePart(prefix, generateName);
            suffix = formatGeneratedNamePart(suffix, generateName);
            baseName = formatIdentifier(baseName, generateName);
            return `${privateName ? "#" : ""}${prefix}${baseName}${suffix}`;
        }