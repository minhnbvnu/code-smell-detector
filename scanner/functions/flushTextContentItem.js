function flushTextContentItem() {
      if (!textContentItem.initialized) {
        return;
      }

      if (!textContentItem.vertical) {
        textContentItem.width *= textContentItem.textAdvanceScale;
      } else {
        textContentItem.height *= textContentItem.textAdvanceScale;
      }

      textContent.items.push(runBidiTransform(textContentItem));
      textContentItem.initialized = false;
      textContentItem.str.length = 0;
    }