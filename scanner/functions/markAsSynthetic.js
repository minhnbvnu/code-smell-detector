function markAsSynthetic(node) {
                setTextRangePosEnd(node, -1, -1);
                return visitEachChild(node, markAsSynthetic, nullTransformationContext);
            }