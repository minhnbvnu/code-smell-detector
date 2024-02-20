function getDefaultLibFilePriority(a) {
                if (containsPath(defaultLibraryPath, a.fileName, 
                /*ignoreCase*/
                false)) {
                    const basename = getBaseFileName(a.fileName);
                    if (basename === "lib.d.ts" || basename === "lib.es6.d.ts")
                        return 0;
                    const name = removeSuffix(removePrefix(basename, "lib."), ".d.ts");
                    const index = libs.indexOf(name);
                    if (index !== -1)
                        return index + 1;
                }
                return libs.length + 2;
            }