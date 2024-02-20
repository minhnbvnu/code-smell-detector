function extractDict(pdfDoc) {
    const { PDFDict } = require("pdf-lib");
    const dict = {};
    for (const obj of pdfDoc.context.indirectObjects.entries()) {
        if (obj[1] && obj[1] instanceof PDFDict) {
            for (const entry of obj[1].dict.entries()) {
                if (entry[0].encodedName == '/Dest') {
                    const key = entry[1].encodedName;
                    dict[key] = {
                        dest: entry[1]
                    };
                }
            }
        }
    }
    return dict;
}