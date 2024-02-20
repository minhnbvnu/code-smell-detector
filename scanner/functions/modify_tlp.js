function modify_tlp(itype, oid, tlp) {
    var res = false;
    $.ajax({
        type: "POST",
        url: tlp_modify,
        async: false,
        data: {
            'tlp': tlp,
            'oid': oid,
            'itype': itype
        },
        datatype: 'json',
        success: function(data) {
            res = data.success;
        }
    });
    return res;
}