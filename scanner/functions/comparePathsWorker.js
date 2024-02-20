function comparePathsWorker(a, b, componentComparer) {
            if (a === b)
                return 0 /* EqualTo */;
            if (a === void 0)
                return -1 /* LessThan */;
            if (b === void 0)
                return 1 /* GreaterThan */;
            const aRoot = a.substring(0, getRootLength(a));
            const bRoot = b.substring(0, getRootLength(b));
            const result = compareStringsCaseInsensitive(aRoot, bRoot);
            if (result !== 0 /* EqualTo */) {
                return result;
            }
            const aRest = a.substring(aRoot.length);
            const bRest = b.substring(bRoot.length);
            if (!relativePathSegmentRegExp.test(aRest) && !relativePathSegmentRegExp.test(bRest)) {
                return componentComparer(aRest, bRest);
            }
            const aComponents = reducePathComponents(getPathComponents(a));
            const bComponents = reducePathComponents(getPathComponents(b));
            const sharedLength = Math.min(aComponents.length, bComponents.length);
            for (let i = 1; i < sharedLength; i++) {
                const result2 = componentComparer(aComponents[i], bComponents[i]);
                if (result2 !== 0 /* EqualTo */) {
                    return result2;
                }
            }
            return compareValues(aComponents.length, bComponents.length);
        }