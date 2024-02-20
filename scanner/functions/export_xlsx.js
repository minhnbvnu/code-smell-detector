function export_xlsx() {
    if (['xlsx', 'xls', 'ods'].includes(extName)) {
        var new_wb = xtos(sheetIns.getData());
        var buffer = XLSX.write(new_wb, { bookType: extName, type: "array" });
        const array = [...new Uint8Array(buffer)];
        vscodeEvent.emit('save', array)
    } else if (extName == "csv") {
        const csvContent = XLSX.utils.sheet_to_csv(dataToSheet(sheetIns.getData()[0]));
        vscodeEvent.emit('saveCsv', csvContent)
    }
}