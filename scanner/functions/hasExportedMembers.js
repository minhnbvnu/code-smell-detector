function hasExportedMembers(moduleSymbol) {
                return forEachEntry(moduleSymbol.exports, (_, id) => id !== "export=");
            }