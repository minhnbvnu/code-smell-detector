function isShorthandPropertyNameUseSite(useSite) {
            return isIdentifier(useSite) && isShorthandPropertyAssignment(useSite.parent) && useSite.parent.name === useSite;
        }