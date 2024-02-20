function getUniqueName(baseName, sourceFile) {
            let nameText = baseName;
            for (let i = 1; !isFileLevelUniqueName(sourceFile, nameText); i++) {
                nameText = `${baseName}_${i}`;
            }
            return nameText;
        }