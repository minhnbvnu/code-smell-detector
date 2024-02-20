function spanForNodeArray(nodeArray) {
                return nodeArray.length ? createOutliningSpan(createTextSpanFromRange(nodeArray), "code" /* Code */) : void 0;
            }