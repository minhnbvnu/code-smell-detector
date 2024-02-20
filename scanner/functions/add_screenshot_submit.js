function add_screenshot_submit(e) {
    var elem = $(e.currentTarget);
    var dialog = elem.closest(".ui-dialog");
    var form = dialog.find("form");
    var csrftoken = readCookie('csrftoken');
    var input = $("<input>")
               .attr("type", "hidden")
               .attr("name", "csrfmiddlewaretoken").val(csrftoken);
    form.append($(input));
    form.find("#id_oid").val(my_id);
    form.find("#id_otype").val(my_type);
    form.submit();
}