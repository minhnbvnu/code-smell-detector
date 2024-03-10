	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            $img = convertToTensor(img, 'img', 'toPixels');

	            if (!(img instanceof Tensor)) {
	              // Assume int32 if user passed a native array.
	              originalImgTensor = $img;
	              $img = cast(originalImgTensor, 'int32');
	              originalImgTensor.dispose();
	            }

	            if (!($img.rank !== 2 && $img.rank !== 3)) {
	              _context.next = 4;
	              break;
	            }

	            throw new Error("toPixels only supports rank 2 or 3 tensors, got rank " + $img.rank + ".");

	          case 4:
	            _$img$shape$slice = $img.shape.slice(0, 2), height = _$img$shape$slice[0], width = _$img$shape$slice[1];
	            depth = $img.rank === 2 ? 1 : $img.shape[2];

	            if (!(depth > 4 || depth === 2)) {
	              _context.next = 8;
	              break;
	            }

	            throw new Error("toPixels only supports depth of size " + ("1, 3 or 4 but got " + depth));

	          case 8:
	            if (!($img.dtype !== 'float32' && $img.dtype !== 'int32')) {
	              _context.next = 10;
	              break;
	            }

	            throw new Error("Unsupported type for toPixels: " + $img.dtype + "." + " Please use float32 or int32 tensors.");

	          case 10:
	            _context.next = 12;
	            return $img.data();

	          case 12:
	            data = _context.sent;
	            multiplier = $img.dtype === 'float32' ? 255 : 1;
	            bytes = new Uint8ClampedArray(width * height * 4);
	            i = 0;

	          case 16:
	            if (!(i < height * width)) {
	              _context.next = 41;
	              break;
	            }

	            rgba = [0, 0, 0, 255];
	            d = 0;

	          case 19:
	            if (!(d < depth)) {
	              _context.next = 33;
	              break;
	            }

	            value = data[i * depth + d];

	            if (!($img.dtype === 'float32')) {
	              _context.next = 26;
	              break;
	            }

	            if (!(value < 0 || value > 1)) {
	              _context.next = 24;
	              break;
	            }

	            throw new Error("Tensor values for a float32 Tensor must be in the " + ("range [0 - 1] but encountered " + value + "."));

	          case 24:
	            _context.next = 29;
	            break;

	          case 26:
	            if (!($img.dtype === 'int32')) {
	              _context.next = 29;
	              break;
	            }

	            if (!(value < 0 || value > 255)) {
	              _context.next = 29;
	              break;
	            }

	            throw new Error("Tensor values for a int32 Tensor must be in the " + ("range [0 - 255] but encountered " + value + "."));

	          case 29:
	            if (depth === 1) {
	              rgba[0] = value * multiplier;
	              rgba[1] = value * multiplier;
	              rgba[2] = value * multiplier;
	            } else {
	              rgba[d] = value * multiplier;
	            }

	          case 30:
	            d++;
	            _context.next = 19;
	            break;

	          case 33:
	            j = i * 4;
	            bytes[j + 0] = Math.round(rgba[0]);
	            bytes[j + 1] = Math.round(rgba[1]);
	            bytes[j + 2] = Math.round(rgba[2]);
	            bytes[j + 3] = Math.round(rgba[3]);

	          case 38:
	            ++i;
	            _context.next = 16;
	            break;

	          case 41:
	            if (canvas != null) {
	              canvas.width = width;
	              canvas.height = height;
	              ctx = canvas.getContext('2d');
	              imageData = new ImageData(bytes, width, height);
	              ctx.putImageData(imageData, 0, 0);
	            }

	            if ($img !== img) {
	              $img.dispose();
	            }

	            return _context.abrupt("return", bytes);

	          case 44:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);