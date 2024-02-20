function makeUniqueName(name, identifiers) {
            while (identifiers.original.has(name) || identifiers.additional.has(name)) {
                name = `_${name}`;
            }
            identifiers.additional.add(name);
            return name;
        }