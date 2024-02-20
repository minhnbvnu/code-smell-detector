function editAction(action, object_types, preferred) {
    var me = $("#add-new-action-form input[name='action']");
    var ots = $("#add-new-action-form select[name='object_types']");
    var prefs = $("#add-new-action-form textarea[name='preferred']");
    me.val(action);
    me.change();
	var ot_list = object_types.split(",");
	ots.val(ot_list);
	var prep = preferred.replace(/\|\|/g, "\n").replace(/\|/g, ", ");
	prefs.val(prep);
    $("#add-new-action-form").dialog("open");
}