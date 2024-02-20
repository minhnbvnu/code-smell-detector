function invalidDoc(doc) {
    if (doc.query) {
      if (typeof doc.query.type != "string") return ".query.type must be a string";
      if (doc.query.start && !isPosition(doc.query.start)) return ".query.start must be a position";
      if (doc.query.end && !isPosition(doc.query.end)) return ".query.end must be a position";
    }

    if (doc.files) {
      if (!Array.isArray(doc.files)) return "Files property must be an array";

      for (var i = 0; i < doc.files.length; ++i) {
        var file = doc.files[i];
        if (typeof file != "object") return ".files[n] must be objects";else if (typeof file.name != "string") return ".files[n].name must be a string";else if (file.type == "delete") continue;else if (typeof file.text != "string") return ".files[n].text must be a string";else if (file.type == "part") {
          if (!isPosition(file.offset) && typeof file.offsetLines != "number") return ".files[n].offset must be a position";
        } else if (file.type != "full") return ".files[n].type must be \"full\" or \"part\"";
      }
    }
  }