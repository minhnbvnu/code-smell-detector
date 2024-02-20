function textSpanOverlap(span1, span2) {
            const overlap = textSpanIntersection(span1, span2);
            return overlap && overlap.length === 0 ? void 0 : overlap;
        }