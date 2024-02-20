function CmapEntry(data, offset) {
    var code,
      count,
      endCode,
      glyphId,
      glyphIds,
      i,
      idDelta,
      idRangeOffset,
      index,
      saveOffset,
      segCount,
      segCountX2,
      start,
      startCode,
      tail,
      _j,
      _k,
      _len;
    this.platformID = data.readUInt16();
    this.encodingID = data.readShort();
    this.offset = offset + data.readInt();
    saveOffset = data.pos;
    data.pos = this.offset;
    this.format = data.readUInt16();
    this.length = data.readUInt16();
    this.language = data.readUInt16();
    this.isUnicode =
      (this.platformID === 3 && this.encodingID === 1 && this.format === 4) ||
      (this.platformID === 0 && this.format === 4);
    this.codeMap = {};
    switch (this.format) {
      case 0:
        for (i = 0; i < 256; ++i) {
          this.codeMap[i] = data.readByte();
        }
        break;
      case 4:
        segCountX2 = data.readUInt16();
        segCount = segCountX2 / 2;
        data.pos += 6;
        endCode = (function() {
          var _j, _results;
          _results = [];
          for (
            i = _j = 0;
            0 <= segCount ? _j < segCount : _j > segCount;
            i = 0 <= segCount ? ++_j : --_j
          ) {
            _results.push(data.readUInt16());
          }
          return _results;
        })();
        data.pos += 2;
        startCode = (function() {
          var _j, _results;
          _results = [];
          for (
            i = _j = 0;
            0 <= segCount ? _j < segCount : _j > segCount;
            i = 0 <= segCount ? ++_j : --_j
          ) {
            _results.push(data.readUInt16());
          }
          return _results;
        })();
        idDelta = (function() {
          var _j, _results;
          _results = [];
          for (
            i = _j = 0;
            0 <= segCount ? _j < segCount : _j > segCount;
            i = 0 <= segCount ? ++_j : --_j
          ) {
            _results.push(data.readUInt16());
          }
          return _results;
        })();
        idRangeOffset = (function() {
          var _j, _results;
          _results = [];
          for (
            i = _j = 0;
            0 <= segCount ? _j < segCount : _j > segCount;
            i = 0 <= segCount ? ++_j : --_j
          ) {
            _results.push(data.readUInt16());
          }
          return _results;
        })();
        count = (this.length - data.pos + this.offset) / 2;
        glyphIds = (function() {
          var _j, _results;
          _results = [];
          for (
            i = _j = 0;
            0 <= count ? _j < count : _j > count;
            i = 0 <= count ? ++_j : --_j
          ) {
            _results.push(data.readUInt16());
          }
          return _results;
        })();
        for (i = _j = 0, _len = endCode.length; _j < _len; i = ++_j) {
          tail = endCode[i];
          start = startCode[i];
          for (
            code = _k = start;
            start <= tail ? _k <= tail : _k >= tail;
            code = start <= tail ? ++_k : --_k
          ) {
            if (idRangeOffset[i] === 0) {
              glyphId = code + idDelta[i];
            } else {
              index = idRangeOffset[i] / 2 + (code - start) - (segCount - i);
              glyphId = glyphIds[index] || 0;
              if (glyphId !== 0) {
                glyphId += idDelta[i];
              }
            }
            this.codeMap[code] = glyphId & 0xffff;
          }
        }
    }
    data.pos = saveOffset;
  }