function asName(name) {
                return typeof name === "string" ? createIdentifier(name) : name;
            }