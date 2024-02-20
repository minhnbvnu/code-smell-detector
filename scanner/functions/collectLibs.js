function collectLibs(sourceFile, ret) {
                forEach(sourceFile.libReferenceDirectives, (ref) => {
                    const lib = host.getLibFileFromReference(ref);
                    if (lib) {
                        ret.set(toFileNameLowerCase(ref.fileName), true);
                    }
                });
                return ret;
            }