function reservedAppend(item, index) {
    $("#reservation-list").append('<li id="reserved-' + index + '">\
                ' + i18n.__('task-reservation-time-setting') + ' <input id="reserved-time-' + index + '" type="time"\
                onchange="reservedEdit(' + index + ')" value="' + item.time + '" /><br/>'
        + i18n.__('task-reservation-follow-plan') +
        '<div class="dropdown dropdown-default">\
            <a class="btn btn-outline-secondary dropdown-toggle dropdown-reserved-button"\
                id="dropdown-reserved-button-' + index + '" data-toggle="dropdown" aria-haspopup="true"\
                        aria-expanded="false">\
                        <span id="dropdown-reserved-title-' + index + '">' + reservedUseDefaultArray[item.plan].name + '</span>\
                    </a>\
                    <div class="dropdown-menu" class="dropdown-menu-reserved"\
                        aria-labelledby="dropdown-reserved-button-' + index + '">\
                        <div id="dropdown-itemlist-' + index + '" value="' + item.plan + '"></div>\
                    </div>\
                </div><br />' +
        i18n.__('task-reservation-cycle') +
        '<input type="number" id="reserved-cycle-' + index + '" class="reserved-cycle"\
                    onchange="reservedEdit(' + index + ')" value="' + item.cycle + '"\
                    oninput="value = value.replace(/[89e.-]+/g, \'\').slice(0, 7);"\
                    style="ime-mode:Disabled" /><br />\
                <span id="deleter' + index + '"><a href="javascript:reservedErase(' + index + ')" class="work underlined">' + i18n.__('delete') + '</a></span></div><hr />\
                </li>'
    );

    reservedUseDefaultArray.forEach(function (defaultArrayItem, defaultArrayIndex, defaultArray) {
        $("#dropdown-itemlist-" + index).append("<a class='dropdown-item' value='" + defaultArrayIndex + "' href='javascript:reservedEditDropdownTrigger(" + index + ',' + defaultArrayIndex + ")' >" + defaultArrayItem.name + "</a>");
    });
}