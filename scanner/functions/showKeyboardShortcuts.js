function showKeyboardShortcuts (editor) {
        if(!document.getElementById('kbshortcutmenu')) {
            var overlayPage = require('./menu_tools/overlay_page').overlayPage;
            var getEditorKeybordShortcuts = require('./menu_tools/get_editor_keyboard_shortcuts').getEditorKeybordShortcuts;
            var kb = getEditorKeybordShortcuts(editor);
            var el = document.createElement('div');
            var commands = kb.reduce(function(previous, current) {
                return previous + '<div class="ace_optionsMenuEntry"><span class="ace_optionsMenuCommand">' 
                    + current.command + '</span> : '
                    + '<span class="ace_optionsMenuKey">' + current.key + '</span></div>';
            }, '');

            el.id = 'kbshortcutmenu';
            el.innerHTML = '<h1>Keyboard Shortcuts</h1>' + commands + '</div>';
            overlayPage(editor, el, '0', '0', '0', null);
        }
    }