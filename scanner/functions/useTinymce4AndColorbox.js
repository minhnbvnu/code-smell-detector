function useTinymce4AndColorbox(url) {
    if (!usingTinymce4AndColorbox()) { return; }

    parent.document.getElementById(getUrlParam('field_name')).value = url;

    if(typeof parent.tinyMCE !== "undefined") {
      parent.tinyMCE.activeEditor.windowManager.close();
    }
    if(typeof parent.$.fn.colorbox !== "undefined") {
      parent.$.fn.colorbox.close();
    }
  }