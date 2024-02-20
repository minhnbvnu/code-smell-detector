function createContextMenu() {
        var clipboard = window.navigator && window.navigator.clipboard;
        var isOpen = false;
        var updateMenu = function() {
            var selected = editor.getCopyText();
            var hasUndo = editor.session.getUndoManager().hasUndo();
            contextMenu.replaceChild(
                dom.buildDom(isOpen ? ["span",
                    !selected && ["span", { class: "ace_mobile-button", action: "selectall" }, "Select All"],
                    selected && ["span", { class: "ace_mobile-button", action: "copy" }, "Copy"],
                    selected && ["span", { class: "ace_mobile-button", action: "cut" }, "Cut"],
                    clipboard && ["span", { class: "ace_mobile-button", action: "paste" }, "Paste"],
                    hasUndo && ["span", { class: "ace_mobile-button", action: "undo" }, "Undo"],
                    ["span", { class: "ace_mobile-button", action: "find" }, "Find"],
                    ["span", { class: "ace_mobile-button", action: "openCommandPallete" }, "Pallete"]
                ] : ["span"]),
                contextMenu.firstChild
            );
        };
        var handleClick = function(e) {
            var action = e.target.getAttribute("action");

            if (action == "more" || !isOpen) {
                isOpen = !isOpen;
                return updateMenu();
            }
            if (action == "paste") {
                clipboard.readText().then(function (text) {
                    editor.execCommand(action, text);
                });
            }
            else if (action) {
                if (action == "cut" || action == "copy") {
                    if (clipboard)
                        clipboard.writeText(editor.getCopyText());
                    else
                        document.execCommand("copy");
                }
                editor.execCommand(action);
            }
            contextMenu.firstChild.style.display = "none";
            isOpen = false;
            if (action != "openCommandPallete")
                editor.focus();
        };
        contextMenu = dom.buildDom(["div",
            {
                class: "ace_mobile-menu",
                ontouchstart: function(e) {
                    mode = "menu";
                    e.stopPropagation();
                    e.preventDefault();
                    editor.textInput.focus();
                },
                ontouchend: function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    handleClick(e);
                },
                onclick: handleClick
            },
            ["span"],
            ["span", { class: "ace_mobile-button", action: "more" }, "..."]
        ], editor.container);
    }