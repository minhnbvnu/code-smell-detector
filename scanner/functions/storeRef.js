function storeRef(file) {
      return function (node) {
        refs.push({
          file: file.name,
          start: outputPos(query, file, node.start),
          end: outputPos(query, file, node.end)
        });
      };
    }