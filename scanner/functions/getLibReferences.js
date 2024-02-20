function getLibReferences() {
                    return arrayFrom(libs2.keys(), (lib) => ({ fileName: lib, pos: -1, end: -1 }));
                }