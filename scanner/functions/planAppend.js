function planAppend(item, index) {
    $("#itemlist-ul").append(
        "<li id='item" + index + "'> <input name='title' id='title" + index + "' type='text' class='rest' maxlength='15' value='" +
        item.name + "' onchange='planEdit(" + index + ")' /> <br /><div class='text-muted small'>" +
        i18n.__('predefined-tasks-settings-tip-part-1') + " <input id='work-time" + index + "' class='hotkeyset' type='number' value='" +
        item.workTime + "' onchange='planEdit(" + index + ")' oninput='if (Number(value) > 1000) value = 1000' style='ime-mode:Disabled' title=" + i18n.__('what-can-be-here-predefined-tasks') + " /> " +
        i18n.__('min') +
        i18n.__('predefined-tasks-settings-tip-part-2') + " <input id='rest-time" + index + "' class='hotkeyset' type='number' value='" +
        item.restTime + "' onchange='planEdit(" + index + ")' oninput='if (Number(value) > 1000) value = 1000' style='ime-mode:Disabled' title=" + i18n.__('what-can-be-here-predefined-tasks') + " /> " +
        i18n.__('min') +
        i18n.__('predefined-tasks-settings-tip-part-3') + " <input id='loops" + index + "' class='hotkeyset' type='number' value='" +
        item.loops + "' onchange='planEdit(" + index + ")' oninput='if (value.length > 2) value = value.slice(0, 2)' style='ime-mode:Disabled' /> " +
        i18n.__('time(s)') +
        "<br />" + i18n.__('focus-when-working') + " <input id='focus-when-working" + index + "' type='checkbox' onchange='planEdit(" + index + ")' />&nbsp;&nbsp;|&nbsp;" +
        i18n.__('focus-when-resting') + " <input id='focus-when-resting" + index + "' type='checkbox' onchange='planEdit(" + index + ")' />\
                        <br /><span id='set-as-default-task-container" + index + "'><a id='set-as-default" + index + "' class='rest underlined' href='javascript:setAsDefault(" + index + ")'>" + i18n.__('set-as-default-task') + "</a></span>\
                        <span id='deleter" + index + "'>| <a href='javascript:planErase(" + index + ")' class='work underlined'>" + i18n.__('delete') + "</a></span>\
                        </div><hr /></li>"
    );
    document.getElementById("focus-when-working" + index).checked = item.focusWhenWorking;
    document.getElementById("focus-when-resting" + index).checked = item.focusWhenResting;
}