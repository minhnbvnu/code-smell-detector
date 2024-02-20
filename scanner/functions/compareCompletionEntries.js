function compareCompletionEntries(entryInArray, entryToInsert) {
            var _a2, _b;
            let result = compareStringsCaseSensitiveUI(entryInArray.sortText, entryToInsert.sortText);
            if (result === 0 /* EqualTo */) {
                result = compareStringsCaseSensitiveUI(entryInArray.name, entryToInsert.name);
            }
            if (result === 0 /* EqualTo */ && ((_a2 = entryInArray.data) == null ? void 0 : _a2.moduleSpecifier) && ((_b = entryToInsert.data) == null ? void 0 : _b.moduleSpecifier)) {
                result = compareNumberOfDirectorySeparators(entryInArray.data.moduleSpecifier, entryToInsert.data.moduleSpecifier);
            }
            if (result === 0 /* EqualTo */) {
                return -1 /* LessThan */;
            }
            return result;
        }