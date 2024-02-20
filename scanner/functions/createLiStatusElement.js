function createLiStatusElement(prependTo, message, row, col, isShowIcons) {
    var li = $("<li/>").html(message);

    if(typeof row === "number" && typeof row === "number") {
        $(li).attr('data-row', row);
        $(li).attr('data-col', col);
    }

    if(isShowIcons === true ) {
        $(li).append("<a class=\"ui-icon ui-icon-left ui-icon-circle-close\"/>");
    }

    $(li).prependTo(prependTo);
}