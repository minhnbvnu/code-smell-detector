function convertClassificationsToSpans(classifications) {
            Debug.assert(classifications.spans.length % 3 === 0);
            const dense = classifications.spans;
            const result = [];
            for (let i = 0; i < dense.length; i += 3) {
                result.push({
                    textSpan: createTextSpan(dense[i], dense[i + 1]),
                    classificationType: getClassificationTypeName(dense[i + 2])
                });
            }
            return result;
        }