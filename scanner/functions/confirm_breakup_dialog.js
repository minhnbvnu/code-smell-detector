function confirm_breakup_dialog(e) {
        var dialog = $(this);
        var form = $("#form-confirm-breakup");
        var widget = dialog.dialog("activatedBy");  // dialog-persona saves the element that opened the dialog
        var trow = widget.closest("[rtype]");
        dialog.find('.deletemsg').html("Remove " + trow.attr('rtype') + " Relationship" +
                      // Not all relationships are created equal.
                      // XXX Can't always find a string to print with this..
                      (trow.children().next().html() ?
                       " to: <br/>" +
                       trow.children().next().html() : "" ));
    }