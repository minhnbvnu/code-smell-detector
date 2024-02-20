function confirmDelete(del_label, success_callback, args) {
    var buttons = {};

    // Figure out how to bring more details back, object_delete did this:
    // $('#confirm_delete .deletemsg').html("Delete " + trow.attr('type') +
    //                      " Object: <br/><b>" +
    //                      trow.find("[name='object_value']").text() +
    //                      "</b>");

    buttons[del_label] = function() {
        $(this).dialog('close');
        success_callback(args);
    };
    buttons["Cancel"] = function() {$(this).dialog('close');};


    $('<div><span>Are you sure you want to delete?  This action cannot be undone.</span></div>').dialog({
        autoOpen: true,
    width: "auto",
    height: "auto",
        modal: true,
        buttons: buttons,
        title: del_label
    });
}