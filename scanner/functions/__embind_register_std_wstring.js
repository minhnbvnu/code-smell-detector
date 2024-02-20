function __embind_register_std_wstring(rawType, charSize, name) {
          name = readLatin1String(name);
          var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
          if (charSize === 2) {
            decodeString = UTF16ToString;
            encodeString = stringToUTF16;
            lengthBytesUTF = lengthBytesUTF16;
            getHeap = () => HEAPU16;
            shift = 1;
          } else if (charSize === 4) {
            decodeString = UTF32ToString;
            encodeString = stringToUTF32;
            lengthBytesUTF = lengthBytesUTF32;
            getHeap = () => HEAPU32;
            shift = 2;
          }
          registerType(rawType, { name, "fromWireType": function(value) {
            var length = HEAPU32[value >>> 2];
            var HEAP = getHeap();
            var str;
            var decodeStartPtr = value + 4;
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = value + 4 + i * charSize;
              if (i == length || HEAP[currentBytePtr >>> shift] == 0) {
                var maxReadBytes = currentBytePtr - decodeStartPtr;
                var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                if (str === void 0) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + charSize;
              }
            }
            _free(value);
            return str;
          }, "toWireType": function(destructors, value) {
            if (!(typeof value == "string")) {
              throwBindingError("Cannot pass non-string to C++ string type " + name);
            }
            var length = lengthBytesUTF(value);
            var ptr = _malloc(4 + length + charSize);
            ptr >>>= 0;
            HEAPU32[ptr >>> 2] = length >> shift;
            encodeString(value, ptr + 4, length + charSize);
            if (destructors !== null) {
              destructors.push(_free, ptr);
            }
            return ptr;
          }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function(ptr) {
            _free(ptr);
          } });
        }