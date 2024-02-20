function useCkeditor3(url) {
    if (!usingCkeditor3()) { return; }

    if (window.opener) {
      // Popup
      window.opener.CKEDITOR.tools.callFunction(getUrlParam('CKEditorFuncNum'), url);
    } else {
      // Modal (in iframe)
      parent.CKEDITOR.tools.callFunction(getUrlParam('CKEditorFuncNum'), url);
      parent.CKEDITOR.tools.callFunction(getUrlParam('CKEditorCleanUpFuncNum'));
    }
  }