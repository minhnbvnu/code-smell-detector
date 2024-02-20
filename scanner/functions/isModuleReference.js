function isModuleReference(node) {
            const kind = node.kind;
            return kind === 280 /* ExternalModuleReference */ || kind === 163 /* QualifiedName */ || kind === 79 /* Identifier */;
        }