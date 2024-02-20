function seekEOCDR(eocdrCallback) {
			// "End of central directory record" is the last part of a zip archive, and is at least 22 bytes long.
			// Zip file comment is the last part of EOCDR and has max length of 64KB,
			// so we only have to search the last 64K + 22 bytes of a archive for EOCDR signature (0x06054b50).
			var EOCDR_MIN = 22;
			if (reader.size < EOCDR_MIN) {
				onerror(ERR_BAD_FORMAT);
				return;
			}
			var ZIP_COMMENT_MAX = 256 * 256, EOCDR_MAX = EOCDR_MIN + ZIP_COMMENT_MAX;

			// In most cases, the EOCDR is EOCDR_MIN bytes long
			doSeek(EOCDR_MIN, function() {
				// If not found, try within EOCDR_MAX bytes
				doSeek(Math.min(EOCDR_MAX, reader.size), function() {
					onerror(ERR_BAD_FORMAT);
				});
			});

			// seek last length bytes of file for EOCDR
			function doSeek(length, eocdrNotFoundCallback) {
				reader.readUint8Array(reader.size - length, length, function(bytes) {
					for (var i = bytes.length - EOCDR_MIN; i >= 0; i--) {
						if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x05 && bytes[i + 3] === 0x06) {
							eocdrCallback(new DataView(bytes.buffer, i, EOCDR_MIN));
							return;
						}
					}
					eocdrNotFoundCallback();
				}, function() {
					onerror(ERR_READ);
				});
			}
		}