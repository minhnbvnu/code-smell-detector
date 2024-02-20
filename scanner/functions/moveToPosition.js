function moveToPosition(y) {
      // Ensure dragging does not cause elements/text to be selected.
      // https://stackoverflow.com/a/19164149/1263117
      const startOffset = y - baseOffset;
      onChange(clamp(startOffset / spanSize, 0, 1));
    }