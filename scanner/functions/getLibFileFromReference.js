function getLibFileFromReference(ref) {
                const libName = toFileNameLowerCase(ref.fileName);
                const libFileName = libMap.get(libName);
                if (libFileName) {
                    return getSourceFile(pathForLibFile(libFileName));
                }
            }