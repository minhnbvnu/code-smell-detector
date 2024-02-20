async function creatOutlines(doc, dictArray) {
    const { PDFDict, PDFHexString, PDFNumber, PDFName } = require("pdf-lib");
    const createOutlineItem = (doc, dict, parentRefer, outlineRefer, nextOrPrev, childRefs) => {
        const map = new Map();
        map.set(PDFName.Title, PDFHexString.fromText(dict.title));
        map.set(PDFName.Parent, parentRefer);
        if (nextOrPrev != null) {
            map.set(PDFName.of(dict.isLast ? "Prev" : "Next"), nextOrPrev);
        } else {
            map.set(PDFName.of("Next"), outlineRefer);
        }
        if (childRefs) {
            map.set(PDFName.of("First"), childRefs[0]);
            map.set(PDFName.of("Last"), childRefs[childRefs.length - 1]);
            map.set(PDFName.of("Count"), PDFNumber.of(childRefs.length));
        }
        map.set(PDFName.of("Dest"), dict.dest);
        const outlineDict = PDFDict.fromMapWithContext(map, doc.context);
        doc.context.assign(outlineRefer, outlineDict);
        return outlineRefer;
    }


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


    const outlinesDictRef = doc.context.nextRef();
    const outlineRefers = buildOutline(dictArray, doc, outlinesDictRef);


    // 下面是将outline引用绑定pdf outline
    const outlinesDictMap = new Map();
    outlinesDictMap.set(PDFName.Type, PDFName.of("Outlines"));
    outlinesDictMap.set(PDFName.of("First"), outlineRefers[0]);
    outlinesDictMap.set(PDFName.of("Last"), outlineRefers[outlineRefers.length - 1]);
    outlinesDictMap.set(PDFName.of("Count"), PDFNumber.of(outlineRefers.length)); //This is a count of the number of outline items. Should be changed for X no. of outlines
    doc.catalog.set(PDFName.of("Outlines"), outlinesDictRef)
    doc.context.assign(outlinesDictRef, PDFDict.fromMapWithContext(outlinesDictMap, doc.context));

}