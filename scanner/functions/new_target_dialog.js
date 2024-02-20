function new_target_dialog(e) {
    var element = document.getElementById('id_campaign');
    var className = $(this).dialog("activatedBy")[0].className
    if (className === "ui-icon ui-icon-plusthick add dialogClick") {
        var campaign = this.baseURI.match(/\/campaigns\/details\/(.*)\//);
        element.value = decodeURI(campaign[1]);
    }
    else {
        element.value = '';
    }
}