function delete_item_click(e, item_type, del_label, data) {
    e.preventDefault();

    var elem = $(e.currentTarget);

    var fn = function(e) {
        return function() {
            $.ajax({
                type:'POST',
                data:data,
                url: elem.attr('action'),
                success: function(data) {
                    if (data.success) {
            if (data.html) { // ajax provided replacement html, use it.
                elem.closest(".guardian").html(data.html);
            } else if (data.last) { //used for collapsible items
                            var to_delete = me = elem.parentsUntil('tr').parent();
                            if (to_delete.hasClass('expand-child')) {
                                //last item in listing, not "delete all" button
                                to_delete = to_delete.add(me.prev());
                            }

                            to_delete = to_delete.add(me.nextUntil('[class!="expand-child"]'));
                            $(to_delete).remove();
                        } else {
                incrementCount(elem.closest(".content_box"), -1, false);
                // For objects that have local count as well
                incrementCount(elem.closest("tr").parent().closest("tr"), -1, true);

                            elem.closest('tr').remove();
                        }
                    } else {
                        var msg = "";
                        if (data.message) {
                            if ($.isArray(data.message)) {
                                data.message = data.message.join('<br>');
                            }
                            msg = data.message;
                        } else {
                            msg = "Unknown error; unable to delete "+item_type;
                        }
                        error_message_dialog('Delete Item Error', msg);
                    }
                }
            });
        }
    }(e);
    confirmDelete(del_label, fn);
}