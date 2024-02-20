function showSettingsMenu(editor) {
    if (!document.getElementById('ace_settingsmenu')) {
        var options = new OptionPanel(editor);
        options.render();
        options.container.id = "ace_settingsmenu";
        overlayPage(editor, options.container, '0', '0', '0');
        options.container.querySelector("select,input,button,checkbox").focus();
    }
}