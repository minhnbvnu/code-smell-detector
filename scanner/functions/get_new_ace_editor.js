function get_new_ace_editor(anchor_id, content_anchor, target_anchor, onchange_callback, do_save, readonly, live_preview) {
    var editor = ace.edit(anchor_id);
    if ($("#"+anchor_id).attr("data-theme") != "dark") {
        editor.setTheme("ace/theme/tomorrow");
    } else {
        editor.setTheme("ace/theme/iris_night");
    }
    editor.session.setMode("ace/mode/markdown");
    if (readonly !== undefined) {
        editor.setReadOnly(readonly);
    }
    editor.renderer.setShowGutter(true);
    editor.setOption("showLineNumbers", true);
    editor.setOption("showPrintMargin", false);
    editor.setOption("displayIndentGuides", true);
    editor.setOption("maxLines", "Infinity");
    editor.setOption("minLines", "2");
    editor.setOption("autoScrollEditorIntoView", true);
    editor.session.setUseWrapMode(true);
    editor.setOption("indentedSoftWrap", false);
    editor.renderer.setScrollMargin(8, 5)
    editor.setOption("enableBasicAutocompletion", true);

    if (do_save !== undefined && do_save !== null) {
        editor.commands.addCommand({
            name: 'save',
            bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
            exec: function(editor) {
                do_save()
            }
        });
    }

    editor.commands.addCommand({
        name: 'bold',
        bindKey: {win: "Ctrl-B", "mac": "Cmd-B"},
        exec: function(editor) {
            editor.insertSnippet('**${1:$SELECTION}**');
        }
    });
    editor.commands.addCommand({
        name: 'italic',
        bindKey: {win: "Ctrl-I", "mac": "Cmd-I"},
        exec: function(editor) {
            editor.insertSnippet('*${1:$SELECTION}*');
        }
    });
    editor.commands.addCommand({
        name: 'head_1',
        bindKey: {win: "Ctrl-Shift-1", "mac": "Cmd-Shift-1"},
        exec: function(editor) {
            editor.insertSnippet('# ${1:$SELECTION}');
        }
    });
    editor.commands.addCommand({
        name: 'head_2',
        bindKey: {win: "Ctrl-Shift-2", "mac": "Cmd-Shift-2"},
        exec: function(editor) {
            editor.insertSnippet('## ${1:$SELECTION}');
        }
    });
    editor.commands.addCommand({
        name: 'head_3',
        bindKey: {win: "Ctrl-Shift-3", "mac": "Cmd-Shift-3"},
        exec: function(editor) {
            editor.insertSnippet('### ${1:$SELECTION}');
        }
    });
    editor.commands.addCommand({
        name: 'head_4',
        bindKey: {win: "Ctrl-Shift-4", "mac": "Cmd-Shift-4"},
        exec: function(editor) {
            editor.insertSnippet('#### ${1:$SELECTION}');
        }
    });

    editor.commands.addCommand({
        name: 'link',
        bindKey: {win: "Ctrl-K", "mac": "Cmd-K"},
        exec: function(editor) {
            editor.insertSnippet('[${1:$SELECTION}](url)');
        }
    });

    editor.commands.addCommand({
        name: 'code',
        bindKey: {win: "Ctrl-`", "mac": "Cmd-`"},
        exec: function(editor) {
            editor.insertSnippet('```${1:$SELECTION}```')
        }
    });

    if (live_preview === undefined || live_preview === true) {
        let textarea = $('#'+content_anchor);
        // Remove any previous event handler
        editor.getSession().off("change");

        editor.getSession().on("change", function () {
            if (onchange_callback !== undefined && onchange_callback !== null) {
                onchange_callback();
            }

            textarea.text(editor.getSession().getValue());
            let target = document.getElementById(target_anchor);
            let converter = get_showdown_convert();
            let html = converter.makeHtml(editor.getSession().getValue());
            target.innerHTML = do_md_filter_xss(html);

        });

        textarea.text(editor.getSession().getValue());
        let target = document.getElementById(target_anchor);
        let converter = get_showdown_convert();
        let html = converter.makeHtml(editor.getSession().getValue());
        target.innerHTML = do_md_filter_xss(html);

    }

    return editor;
}