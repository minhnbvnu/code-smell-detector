function getTypeReferenceResolutionName(entry) {
            return !isString(entry) ? toFileNameLowerCase(entry.fileName) : entry;
        }