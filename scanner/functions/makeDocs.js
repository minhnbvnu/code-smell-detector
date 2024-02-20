function makeDocs(start, end) {
      const docs = [];
      for (let i = start; i < end; i++) {
        docs.push({
          _id: i.toString(),
          integer: i,
          string: i.toString()
        });
      }
      return docs;
    }