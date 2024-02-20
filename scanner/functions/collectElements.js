function collectElements(sourceFile, cancellationToken) {
            const res = [];
            addNodeOutliningSpans(sourceFile, cancellationToken, res);
            addRegionOutliningSpans(sourceFile, res);
            return res.sort((span1, span2) => span1.textSpan.start - span2.textSpan.start);
        }