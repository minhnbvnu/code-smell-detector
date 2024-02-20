function textSpanIntersection(span1, span2) {
            const start = Math.max(span1.start, span2.start);
            const end = Math.min(textSpanEnd(span1), textSpanEnd(span2));
            return start <= end ? createTextSpanFromBounds(start, end) : void 0;
        }