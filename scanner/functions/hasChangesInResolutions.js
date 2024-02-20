function hasChangesInResolutions(names, newSourceFile, newResolutions, oldResolutions, comparer, nameAndModeGetter) {
            Debug.assert(names.length === newResolutions.length);
            for (let i = 0; i < names.length; i++) {
                const newResolution = newResolutions[i];
                const entry = names[i];
                const name = nameAndModeGetter.getName(entry);
                const mode = nameAndModeGetter.getMode(entry, newSourceFile);
                const oldResolution = oldResolutions && oldResolutions.get(name, mode);
                const changed = oldResolution ? !newResolution || !comparer(oldResolution, newResolution) : newResolution;
                if (changed) {
                    return true;
                }
            }
            return false;
        }