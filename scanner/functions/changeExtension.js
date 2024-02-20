function changeExtension(path, newExtension) {
            return changeAnyExtension(path, newExtension, extensionsToRemove, 
            /*ignoreCase*/
            false);
        }