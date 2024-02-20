function defaultSubmit(e) {
    var dialog = $(e.currentTarget).closest(".ui-dialog").find(".ui-dialog-content");
    var form = dialog.find('form');
    var csrftoken = readCookie('csrftoken');
    var input = $("<input>")
               .attr("type", "hidden")
               .attr("name", "csrfmiddlewaretoken").val(csrftoken);
    form.append($(input));
    form.submit();
}