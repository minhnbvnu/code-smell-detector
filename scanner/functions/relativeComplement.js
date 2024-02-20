function relativeComplement(arrayA, arrayB, comparer) {
            if (!arrayB || !arrayA || arrayB.length === 0 || arrayA.length === 0)
                return arrayB;
            const result = [];
            loopB: for (let offsetA = 0, offsetB = 0; offsetB < arrayB.length; offsetB++) {
                if (offsetB > 0) {
                    Debug.assertGreaterThanOrEqual(comparer(arrayB[offsetB], arrayB[offsetB - 1]), 0 /* EqualTo */);
                }
                loopA: for (const startA = offsetA; offsetA < arrayA.length; offsetA++) {
                    if (offsetA > startA) {
                        Debug.assertGreaterThanOrEqual(comparer(arrayA[offsetA], arrayA[offsetA - 1]), 0 /* EqualTo */);
                    }
                    switch (comparer(arrayB[offsetB], arrayA[offsetA])) {
                        case -1 /* LessThan */:
                            result.push(arrayB[offsetB]);
                            continue loopB;
                        case 0 /* EqualTo */:
                            continue loopB;
                        case 1 /* GreaterThan */:
                            continue loopA;
                    }
                }
            }
            return result;
        }