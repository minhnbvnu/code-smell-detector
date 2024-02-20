function combobox_textbox_onchange(textbox) {
    const dropdown = textbox.previousElementSibling;

    for (let i = 1; i < dropdown.options.length; ++i) {
        if (dropdown.options[i].value === textbox.value) {
            dropdown.selectedIndex = i;
            // Erase the old custom value
            dropdown.options[0].value = dropdown.options[0].innerHTML = '';
            return;
        }
    }

    // Set the custom value
    dropdown.selectedIndex = 0;
    dropdown.options[0].value = dropdown.options[0].innerHTML = textbox.value;
}