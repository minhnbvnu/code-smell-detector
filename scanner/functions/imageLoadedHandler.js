function imageLoadedHandler() {
            editor.$(selectedImage).off('load', imageLoadedHandler);
            editor.nodeChanged();
            if (uploadImmediately) {
              editor.editorUpload.uploadImagesAuto();
            } else {
              cancelTimedUpload(imageUploadTimerState);
              startTimedUpload(editor, imageUploadTimerState);
            }
          }