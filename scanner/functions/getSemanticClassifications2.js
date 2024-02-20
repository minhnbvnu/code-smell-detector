function getSemanticClassifications2(program, cancellationToken, sourceFile, span) {
            const classifications = getEncodedSemanticClassifications2(program, cancellationToken, sourceFile, span);
            Debug.assert(classifications.spans.length % 3 === 0);
            const dense = classifications.spans;
            const result = [];
            for (let i = 0; i < dense.length; i += 3) {
                result.push({
                    textSpan: createTextSpan(dense[i], dense[i + 1]),
                    classificationType: dense[i + 2]
                });
            }
            return result;
        }