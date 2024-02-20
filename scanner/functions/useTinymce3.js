function useTinymce3(url) {
    if (!usingTinymce3()) { return; }

    var win = tinyMCEPopup.getWindowArg("window");
    win.document.getElementById(tinyMCEPopup.getWindowArg("input")).value = url;
    if (typeof(win.ImageDialog) != "undefined") {
      // Update image dimensions
      if (win.ImageDialog.getImageData) {
        win.ImageDialog.getImageData();
      }

      // Preview if necessary
      if (win.ImageDialog.showPreviewImage) {
        win.ImageDialog.showPreviewImage(url);
      }
    }
    tinyMCEPopup.close();
  }