function setAsDefault(index) {
    if ($('#set-as-default' + index).text() !== i18n.__('cancel-default-task')) {
        $("#deleter" + store.get("default-task")).css("display", "inline");
        $('#title' + store.get("default-task")).removeClass("work");
        $('#set-as-default' + store.get("default-task")).text(i18n.__('set-as-default-task'));
        $('#title' + store.get("default-task")).addClass("rest");
        store.set("default-task", index);
        $('#set-as-default' + index).text(i18n.__('cancel-default-task'));
        $("#deleter" + index).css("display", "none");
        $('#title' + index).removeClass("rest");
        $('#title' + index).addClass("work");
    } else {
        store.set("default-task", -1);
        $('#set-as-default' + index).text(i18n.__('set-as-default-task'));
        $("#deleter" + index).css("display", "inline");
        $('#title' + index).removeClass("work");
        $('#title' + index).addClass("rest");
    }
}