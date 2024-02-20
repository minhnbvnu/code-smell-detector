function buildOutline(dictArray, doc, parentRef) {
        const outlineRefers = [];
        for (const _ of dictArray) {
            outlineRefers.push(doc.context.nextRef());
        }
        for (let i = 0; i < dictArray.length; i++) {
            const dict = dictArray[i];
            const isLast = i == dictArray.length - 1;
            const nextOrPrev = isLast ? outlineRefers[i - 1] : outlineRefers[i + 1];
            const childRefs = dict.child ? buildOutline(dict.child, doc, outlineRefers[i]) : null
            createOutlineItem(doc, dict, parentRef, outlineRefers[i], nextOrPrev, childRefs);
        }
        return outlineRefers;
    }