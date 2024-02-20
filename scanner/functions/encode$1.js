function encode$1(decoded) {
    var sourceFileIndex = 0;
    var sourceCodeLine = 0;
    var sourceCodeColumn = 0;
    var nameIndex = 0;
    var mappings = "";
    for (var i = 0; i < decoded.length; i++) {
      var line = decoded[i];
      if (i > 0)
        mappings += ";";
      if (line.length === 0)
        continue;
      var generatedCodeColumn = 0;
      var lineMappings = [];
      for (var _i2 = 0, line_1 = line; _i2 < line_1.length; _i2++) {
        var segment = line_1[_i2];
        var segmentMappings = encodeInteger$1(segment[0] - generatedCodeColumn);
        generatedCodeColumn = segment[0];
        if (segment.length > 1) {
          segmentMappings += encodeInteger$1(segment[1] - sourceFileIndex) + encodeInteger$1(segment[2] - sourceCodeLine) + encodeInteger$1(segment[3] - sourceCodeColumn);
          sourceFileIndex = segment[1];
          sourceCodeLine = segment[2];
          sourceCodeColumn = segment[3];
        }
        if (segment.length === 5) {
          segmentMappings += encodeInteger$1(segment[4] - nameIndex);
          nameIndex = segment[4];
        }
        lineMappings.push(segmentMappings);
      }
      mappings += lineMappings.join(",");
    }
    return mappings;
  }