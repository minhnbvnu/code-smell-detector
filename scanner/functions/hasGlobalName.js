function hasGlobalName(name) {
                return globals.has(escapeLeadingUnderscores(name));
            }