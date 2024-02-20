function isModuleIdentifier(node) {
            return isIdentifier(node) && node.escapedText === "module";
        }