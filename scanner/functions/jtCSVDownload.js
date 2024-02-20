function jtCSVDownload(jtid) {
    var jtable = $("#" + jtid);
    var fields = jtable.data('hikJtable')._columnList;
    var indx = fields.indexOf("details");
    var list_url = jtable.data('hikJtable').options.actions.listAction;
    var csvurl = null;
    // Handle fields
    if (indx != -1) {
        fields.splice(indx,1);
    }
    indx = fields.indexOf("id");
    if (indx != -1) {
        fields.splice(indx,1);
    }
    fields = fields.join();
    // Build CSV download URL
    csvurl = list_url.replace("jtlist","csv");
    if (csvurl) {
        // Add the fields
        if (csvurl.indexOf("?") != -1) {
            csvurl = csvurl + "&fields=" + fields;
        } else {
            csvurl = csvurl + "?fields=" + fields;
        }
        window.location.href = csvurl;
    }
}