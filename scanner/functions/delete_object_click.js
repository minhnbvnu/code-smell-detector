function delete_object_click(e, item_type, del_label, data) {
    var elem = $(e.currentTarget);
    var action = elem.attr('action');

    // We want to follow page redirects to new listing, so craft a form and submit() it
    var fn = (function(e) {
        return function() {
        var form = "<form method='POST' action='" + action + "'>";
        var csrftoken = readCookie('csrftoken');
        form = form + "<input type='hidden' name='csrfmiddlewaretoken' value='" + csrftoken + "'>"
        $.each(data, function(k,v) { form = form + $("input").attr("type","hidden").attr("name",k).val(v).html(); } );
        form = form + "</form>";
        $(form).appendTo("body").submit();
    };
    })(e);

    confirmDelete(del_label, fn);
}