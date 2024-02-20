function isReservedName(name, privateName) {
                return privateName ? !!(reservedPrivateNames == null ? void 0 : reservedPrivateNames.has(name)) : !!(reservedNames == null ? void 0 : reservedNames.has(name));
            }