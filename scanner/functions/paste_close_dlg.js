function paste_close_dlg(e) {
          paste(e);
          // There must be a better way to do this, but it's not any of:
          // .hide(), .remove() or .dialog('close')
          paste_dlg.find('.close').click();
          document.removeEventListener('paste', paste_close_dlg);
        }