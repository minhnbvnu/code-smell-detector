function nodeToString(node, label) {
        const suffix = label ? `:${label}` : "";
        switch (node.type) {
            case "Identifier": return `${node.type}${suffix} (${node.name})`;
            case "Literal": return `${node.type}${suffix} (${node.value})`;
            default: return `${node.type}${suffix}`;
        }
    }