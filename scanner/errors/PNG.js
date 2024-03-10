function PNG(data) {
    var chunkSize,
      colors,
      palLen,
      delayDen,
      delayNum,
      frame,
      index,
      key,
      section,
      palShort,
      text,
      _i,
      _j,
      _ref;
    this.data = data;
    this.pos = 8;
    this.palette = [];
    this.imgData = [];
    this.transparency = {};
    this.animation = null;
    this.text = {};
    frame = null;
    while (true) {
      chunkSize = this.readUInt32();
      section = function() {
        var _i, _results;
        _results = [];
        for (_i = 0; _i < 4; ++_i) {
          _results.push(String.fromCharCode(this.data[this.pos++]));
        }
        return _results;
      }
        .call(this)
        .join("");
      switch (section) {
        case "IHDR":
          this.width = this.readUInt32();
          this.height = this.readUInt32();
          this.bits = this.data[this.pos++];
          this.colorType = this.data[this.pos++];
          this.compressionMethod = this.data[this.pos++];
          this.filterMethod = this.data[this.pos++];
          this.interlaceMethod = this.data[this.pos++];
          break;
        case "acTL":
          this.animation = {
            numFrames: this.readUInt32(),
            numPlays: this.readUInt32() || Infinity,
            frames: []
          };
          break;
        case "PLTE":
          this.palette = this.read(chunkSize);
          break;
        case "fcTL":
          if (frame) {
            this.animation.frames.push(frame);
          }
          this.pos += 4;
          frame = {
            width: this.readUInt32(),
            height: this.readUInt32(),
            xOffset: this.readUInt32(),
            yOffset: this.readUInt32()
          };
          delayNum = this.readUInt16();
          delayDen = this.readUInt16() || 100;
          frame.delay = (1000 * delayNum) / delayDen;
          frame.disposeOp = this.data[this.pos++];
          frame.blendOp = this.data[this.pos++];
          frame.data = [];
          break;
        case "IDAT":
        case "fdAT":
          if (section === "fdAT") {
            this.pos += 4;
            chunkSize -= 4;
          }
          data = (frame != null ? frame.data : void 0) || this.imgData;
          for (
            _i = 0;
            0 <= chunkSize ? _i < chunkSize : _i > chunkSize;
            0 <= chunkSize ? ++_i : --_i
          ) {
            data.push(this.data[this.pos++]);
          }
          break;
        case "tRNS":
          this.transparency = {};
          switch (this.colorType) {
            case 3:
              palLen = this.palette.length / 3;
              this.transparency.indexed = this.read(chunkSize);
              if (this.transparency.indexed.length > palLen)
                throw new Error("More transparent colors than palette size");
              /*
               * According to the PNG spec trns should be increased to the same size as palette if shorter
               */
              //palShort = 255 - this.transparency.indexed.length;
              palShort = palLen - this.transparency.indexed.length;
              if (palShort > 0) {
                for (
                  _j = 0;
                  0 <= palShort ? _j < palShort : _j > palShort;
                  0 <= palShort ? ++_j : --_j
                ) {
                  this.transparency.indexed.push(255);
                }
              }
              break;
            case 0:
              this.transparency.grayscale = this.read(chunkSize)[0];
              break;
            case 2:
              this.transparency.rgb = this.read(chunkSize);
          }
          break;
        case "tEXt":
          text = this.read(chunkSize);
          index = text.indexOf(0);
          key = String.fromCharCode.apply(String, text.slice(0, index));
          this.text[key] = String.fromCharCode.apply(
            String,
            text.slice(index + 1)
          );
          break;
        case "IEND":
          if (frame) {
            this.animation.frames.push(frame);
          }
          this.colors = function() {
            switch (this.colorType) {
              case 0:
              case 3:
              case 4:
                return 1;
              case 2:
              case 6:
                return 3;
            }
          }.call(this);
          this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
          colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
          this.pixelBitlength = this.bits * colors;
          this.colorSpace = function() {
            switch (this.colors) {
              case 1:
                return "DeviceGray";
              case 3:
                return "DeviceRGB";
            }
          }.call(this);
          this.imgData = new Uint8Array(this.imgData);
          return;
        default:
          this.pos += chunkSize;
      }
      this.pos += 4;
      if (this.pos > this.data.length) {
        throw new Error("Incomplete or corrupt PNG file");
      }
    }
  }