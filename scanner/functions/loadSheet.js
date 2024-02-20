function loadSheet(buffer, ext) {
    (async () => {
        const ab = new Uint8Array(buffer).buffer
        const wb = ext.toLowerCase() == ".csv" ? XLSX.read(new TextDecoder("utf-8").decode(ab), { type: "string", raw: true }) : XLSX.read(ab, { type: "array" });
        var { sheets, maxLength, maxCols } = convert(wb);
        sheetIns = sheetIns|| x_spreadsheet("#xspreadsheet", {
            row: {
                len: maxLength + 50,
                height: 30,
            },
            col: {
                len: maxCols,
            },
            style: {
                align: 'center'
            }
        })
        sheetIns.loadData(sheets);
    })();
}