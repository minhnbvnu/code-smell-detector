function export2xlsx (data, name) {
    var wb = new Workbook(),
        ws = createSheet(data);

    wb.SheetNames.push(name);
    wb.Sheets[name] = ws;

    var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
    var wbout = XLSX.write(wb,wopts);

    saveAs(new Blob([string2ArrayBuffer(wbout)],
            {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),
        name + ".xlsx");
}