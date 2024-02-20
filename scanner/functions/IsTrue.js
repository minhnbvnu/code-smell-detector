function IsTrue(item) {
    var flag = $(item).attr("checked");
    if (flag == "checked") {
        $("input[name='txtFlag']").removeAttr("disabled");
    }
    else {
        $("input[name='txtFlag']").attr("disabled", "disabled");
        $("input[name='txtFlag']").val("");
    }
}