function reservedEditDropdownTrigger(index, val) {
    $("#dropdown-reserved-title-" + index).text(reservedUseDefaultArray[val].name);
    $("#dropdown-itemlist-" + index).attr("value", val);
    reservedEdit(index);
}