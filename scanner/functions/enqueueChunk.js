function enqueueChunk() {
      const length = textContent.items.length;

      if (length > 0) {
        sink.enqueue(textContent, length);
        textContent.items = [];
        textContent.styles = Object.create(null);
      }
    }