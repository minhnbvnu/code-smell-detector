function setup_paste_dialog() {
  // Firefox only fires a paste event if the cursor is in a text input. So, on
  // Ctrl-V, bring up a dialog with an invisible text box and catch the
  // second Ctrl-V
  var action = {
      icon: 'fa-clipboard', // a font-awesome class used on buttons, etc
      help    : i18n.msg._('Dialog for paste from system clipboard'),
      help_index : 'zz',
      handler : function () {
        var entry_box = $('<input type="text"/>');
        entry_box.css('opacity', 0);
        function paste_close_dlg(e) {
          paste(e);
          // There must be a better way to do this, but it's not any of:
          // .hide(), .remove() or .dialog('close')
          paste_dlg.find('.close').click();
          document.removeEventListener('paste', paste_close_dlg);
        }
        document.addEventListener('paste', paste_close_dlg);
        var cmdtrl = i18n.msg._('Ctrl-V');
        if (utils.platform === 'MacOS') {
            cmdtrl = i18n.msg._('Cmd-V');
        }
        var dialog_body = $("<div/>").append("<p>").append(i18n.msg.sprintf(i18n.msg._("Press %s again to paste"),cmdtrl))
            .append("<br/>")
            .append("<p><b>")
            .append(i18n.msg._("Why is this needed? "))
            .append("</b>")
            .append(i18n.msg._("We can't get paste events in this browser without a text box. "))
            .append(i18n.msg._("There's an invisible text box focused in this dialog."))
            .append($("<form/>").append(entry_box));

        var paste_dlg = dialog.modal({
            notebook: Jupyter.notebook,
            keyboard_manager: Jupyter.keyboard_manager,
            title : i18n.msg.sprintf(i18n.msg._("%s to paste"),cmdtrl),
            body : dialog_body,
            open: function() {
                entry_box.focus();
            },
            buttons : {
                "Cancel" : {
                    // click : function() { reject("Dialog cancelled"); },
                }
            }
        });
      }
  };
  var full_action_name = Jupyter.actions.register(action, 'paste-dialog', 'system-clipboard');
  Jupyter.keyboard_manager.command_shortcuts.add_shortcut('Cmdtrl-V', full_action_name);
}