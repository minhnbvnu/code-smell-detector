function insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal) {
        var content;
        if (hasContentType(clipboardContent, 'text/html')) {
          content = clipboardContent['text/html'];
        } else {
          content = pasteBin.getHtml();
          internal = internal ? internal : isMarked(content);
          if (pasteBin.isDefaultContent(content)) {
            plainTextMode = true;
          }
        }
        content = trimHtml(content);
        pasteBin.remove();
        var isPlainTextHtml = internal === false && isPlainText(content);
        var isImage = isImageUrl(content);
        if (!content.length || isPlainTextHtml && !isImage) {
          plainTextMode = true;
        }
        if (plainTextMode || isImage) {
          if (hasContentType(clipboardContent, 'text/plain') && isPlainTextHtml) {
            content = clipboardContent['text/plain'];
          } else {
            content = innerText(content);
          }
        }
        if (pasteBin.isDefaultContent(content)) {
          if (!isKeyBoardPaste) {
            editor.windowManager.alert('Please use Ctrl+V/Cmd+V keyboard shortcuts to paste contents.');
          }
          return;
        }
        if (plainTextMode) {
          pasteText(editor, content);
        } else {
          pasteHtml$1(editor, content, internal);
        }
      }