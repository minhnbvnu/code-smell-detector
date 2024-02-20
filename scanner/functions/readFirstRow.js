function readFirstRow(csvText) {
    const result = papaparse_default.parse(csvText, {
      download: false,
      dynamicTyping: true,
      preview: 1
    });
    return result.data[0];
  }