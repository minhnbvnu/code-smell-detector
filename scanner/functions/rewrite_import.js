function rewrite_import(node2) {
      const value = edit_source(node2.source.value, sveltePath);
      if (node2.source.value !== value) {
        node2.source.value = value;
        node2.source.raw = null;
      }
    }