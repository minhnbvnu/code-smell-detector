function declarationNameToString(name) {
            return !name || getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
        }