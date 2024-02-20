function getSpecifierText(specifier) {
        return `${specifier.local.name}${specifier.exported.name !== specifier.local.name
            ? ` as ${specifier.exported.name}`
            : ''}`;
    }