function compareModuleSpecifiers2(m1, m2, ignoreCase) {
            const comparer = getOrganizeImportsOrdinalStringComparer(!!ignoreCase);
            return compareModuleSpecifiersWorker(m1, m2, comparer);
        }