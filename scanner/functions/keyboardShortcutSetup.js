function keyboardShortcutSetup() {

    const shortcuts = getSettings().keyboardShortcuts.shortcuts;
    
    addKeyboardShortcut( shortcuts.bold,      () => document.execCommand('bold',false,null)       );
    addKeyboardShortcut( shortcuts.italic,    () => document.execCommand('italic',false,null)     );
    addKeyboardShortcut( shortcuts.underline, () => document.execCommand('underline',false,null)  );
    addKeyboardShortcut( shortcuts.addTimestamp, () => insertTimestamp()                             );
    addKeyboardShortcut( shortcuts.returnToStart, () => {
        const player = getPlayer();
        player.skipTo( 0 );
    });
    setKeyboardShortcutsinUI();
}