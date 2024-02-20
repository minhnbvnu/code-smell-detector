function setKeyboardShortcutsinUI() {
    const shortcuts = getSettings().keyboardShortcuts.shortcuts;
    $('[data-shortcut]').each(function() {
        const shortcut = $(this).attr('data-shortcut');
        $(this).text(getFormattedShortcutFor(shortcut, shortcuts));
    });
}