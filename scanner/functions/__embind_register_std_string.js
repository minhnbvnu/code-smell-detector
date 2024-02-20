function __embind_register_std_string(rawType, name) {
          name = readLatin1String(name);
          var stdStringIsUTF8 = name === "std::string";
          registerType(rawType, { name, "fromWireType": function(value) {
            var length = HEAPU32[value >>> 2];
            var payload = value + 4;
            var str;
            if (stdStringIsUTF8) {
              var decodeStartPtr = payload;
              for (var i = 0; i <= length; ++i) {
                var currentBytePtr = payload + i;
                if (i == length || HEAPU8[currentBytePtr >>> 0] == 0) {
                  var maxRead = currentBytePtr - decodeStartPtr;
                  var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                  if (str === void 0) {
                    str = stringSegment;
                  } else {
                    str += String.fromCharCode(0);
                    str += stringSegment;
                  }
                  decodeStartPtr = currentBytePtr + 1;
                }
              }
            } else {
              var a = new Array(length);
              for (var i = 0; i < length; ++i) {
                a[i] = String.fromCharCode(HEAPU8[payload + i >>> 0]);
              }
              str = a.join("");
            }
            _free(value);
            return str;
          }, "toWireType": function(destructors, value) {
            if (value instanceof ArrayBuffer) {
              value = new Uint8Array(value);
            }
            var length;
            var valueIsOfTypeString = typeof value == "string";
            if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
              throwBindingError("Cannot pass non-string to std::string");
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              length = lengthBytesUTF8(value);
            } else {
              length = value.length;
            }
            var base = _malloc(4 + length + 1);
            var ptr = base + 4;
            ptr >>>= 0;
            HEAPU32[base >>> 2] = length;
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              stringToUTF8(value, ptr, length + 1);
            } else {
              if (valueIsOfTypeString) {
                for (var i = 0; i < length; ++i) {
                  var charCode = value.charCodeAt(i);
                  if (charCode > 255) {
                    _free(ptr);
                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                  }
                  HEAPU8[ptr + i >>> 0] = charCode;
                }
              } else {
                for (var i = 0; i < length; ++i) {
                  HEAPU8[ptr + i >>> 0] = value[i];
                }
              }
            }
            if (destructors !== null) {
              destructors.push(_free, base);
            }
            return base;
          }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function(ptr) {
            _free(ptr);
          } });
        }