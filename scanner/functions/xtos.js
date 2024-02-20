function xtos(sdata) {
    var out = XLSX.utils.book_new();
    sdata.forEach(function (xws) {
        ws = dataToSheet(xws)
        XLSX.utils.book_append_sheet(out, ws, xws.name);
    });
    return out;
}