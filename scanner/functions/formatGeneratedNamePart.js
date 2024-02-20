function formatGeneratedNamePart(part, generateName) {
            return typeof part === "object" ? formatGeneratedName(
            /*privateName*/
            false, part.prefix, part.node, part.suffix, generateName) : typeof part === "string" ? part.length > 0 && part.charCodeAt(0) === 35 /* hash */ ? part.slice(1) : part : "";
        }