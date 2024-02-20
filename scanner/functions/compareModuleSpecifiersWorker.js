function compareModuleSpecifiersWorker(m1, m2, comparer) {
            const name1 = m1 === void 0 ? void 0 : getExternalModuleName2(m1);
            const name2 = m2 === void 0 ? void 0 : getExternalModuleName2(m2);
            return compareBooleans(name1 === void 0, name2 === void 0) || compareBooleans(isExternalModuleNameRelative(name1), isExternalModuleNameRelative(name2)) || // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                comparer(name1, name2);
        }