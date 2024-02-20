function setupApi(editor, editorDiv, settingDiv, ace, options) {
    var session = editor.getSession();
    var renderer = editor.renderer;

    function toBool(value) {
        return value === "true" || value == true;
    }

    editor.setDisplaySettings = function(display) {
        if (display == null)
            display = settingDiv.style.display == "none";
        if (display) {
            settingDiv.style.display = "block";
            settingDiv.hideButton.focus();
            editor.on("focus", function onFocus() {
                editor.removeListener("focus", onFocus);
                settingDiv.style.display = "none";
            });
        } else {
            editor.focus();
        }
    };

    editor.$setOption = editor.setOption;
    editor.$getOption = editor.getOption;
    editor.setOption = function(key, value) {
        switch (key) {
            case "mode":
                editor.$setOption("mode", "ace/mode/" + value);
            break;
            case "theme":
                editor.$setOption("theme", "ace/theme/" + value);
            break;
            case "keybindings":
                switch (value) {
                    case "vim":
                        editor.setKeyboardHandler("ace/keyboard/vim");
                        break;
                    case "emacs":
                        editor.setKeyboardHandler("ace/keyboard/emacs");
                        break;
                    default:
                        editor.setKeyboardHandler(null);
                }
            break;

            case "wrap":
            case "fontSize":
                editor.$setOption(key, value);
            break;
            
            default:
                editor.$setOption(key, toBool(value));
        }
    };

    editor.getOption = function(key) {
        switch (key) {
            case "mode":
                return editor.$getOption("mode").substr("ace/mode/".length);
            break;

            case "theme":
                return editor.$getOption("theme").substr("ace/theme/".length);
            break;

            case "keybindings":
                var value = editor.getKeyboardHandler();
                switch (value && value.$id) {
                    case "ace/keyboard/vim":
                        return "vim";
                    case "ace/keyboard/emacs":
                        return "emacs";
                    default:
                        return "ace";
                }
            break;

            default:
                return editor.$getOption(key);
        }
    };

    editor.setOptions(options);
    return editor;
}