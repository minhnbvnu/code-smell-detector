function BinaryInput(data, strings, index, buffer) {
	      if (strings === void 0) {
	        strings = new Array();
	      }
	      if (index === void 0) {
	        index = 0;
	      }
	      if (buffer === void 0) {
	        buffer = new DataView(data.buffer);
	      }
	      this.strings = strings;
	      this.index = index;
	      this.buffer = buffer;
	    }