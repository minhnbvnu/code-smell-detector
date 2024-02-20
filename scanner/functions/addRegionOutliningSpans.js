function addRegionOutliningSpans(sourceFile, out) {
            const regions = [];
            const lineStarts = sourceFile.getLineStarts();
            for (const currentLineStart of lineStarts) {
                const lineEnd = sourceFile.getLineEndOfPosition(currentLineStart);
                const lineText = sourceFile.text.substring(currentLineStart, lineEnd);
                const result = isRegionDelimiter(lineText);
                if (!result || isInComment(sourceFile, currentLineStart)) {
                    continue;
                }
                if (!result[1]) {
                    const span = createTextSpanFromBounds(sourceFile.text.indexOf("//", currentLineStart), lineEnd);
                    regions.push(createOutliningSpan(span, "region" /* Region */, span, 
                    /*autoCollapse*/
                    false, result[2] || "#region"));
                }
                else {
                    const region = regions.pop();
                    if (region) {
                        region.textSpan.length = lineEnd - region.textSpan.start;
                        region.hintSpan.length = lineEnd - region.textSpan.start;
                        out.push(region);
                    }
                }
            }
        }