function toggleSelectDeselect(toggleButton, listSelector) {
    let allChecked = true;
    $(listSelector).each(function () {
        if (!$(this).prop("checked")) {
            allChecked = false;
        }
        $(this).prop("checked", !$(this).prop("checked"));
    });

    if (allChecked) {
        toggleButton.text("Select All");
    } else {
        toggleButton.text("Deselect All");
    }
}