function convertClassifications(classifications) {
            return { spans: classifications.spans.join(","), endOfLineState: classifications.endOfLineState };
        }