function createZipReader(reader, callback, onerror) {
		var inflateSN = 0;

		function Entry() {
		}

		Entry.prototype.getData = function(writer, onend, onprogress, checkCrc32) {
			var that = this;

			function testCrc32(crc32) {
				var dataCrc32 = getDataHelper(4);
				dataCrc32.view.setUint32(0, crc32);
				return that.crc32 == dataCrc32.view.getUint32(0);
			}

			function getWriterData(uncompressedSize, crc32) {
				if (checkCrc32 && !testCrc32(crc32))
					onerror(ERR_CRC);
				else
					writer.getData(function(data) {
						onend(data);
					});
			}

			function onreaderror(err) {
				onerror(err || ERR_READ_DATA);
			}

			function onwriteerror(err) {
				onerror(err || ERR_WRITE_DATA);
			}

			reader.readUint8Array(that.offset, 30, function(bytes) {
				var data = getDataHelper(bytes.length, bytes), dataOffset;
				if (data.view.getUint32(0) != 0x504b0304) {
					onerror(ERR_BAD_FORMAT);
					return;
				}
				readCommonHeader(that, data, 4, false, onerror);
				dataOffset = that.offset + 30 + that.filenameLength + that.extraFieldLength;
				writer.init(function() {
					if (that.compressionMethod === 0)
						copy(that._worker, inflateSN++, reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
					else
						inflate(that._worker, inflateSN++, reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
				}, onwriteerror);
			}, onreaderror);
		};

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

		var zipReader = {
			getEntries : function(callback) {
				var worker = this._worker;
				// look for End of central directory record
				seekEOCDR(function(dataView) {
					var datalength, fileslength;
					datalength = dataView.getUint32(16, true);
					fileslength = dataView.getUint16(8, true);
					if (datalength < 0 || datalength >= reader.size) {
						onerror(ERR_BAD_FORMAT);
						return;
					}
					reader.readUint8Array(datalength, reader.size - datalength, function(bytes) {
						var i, index = 0, entries = [], entry, filename, comment, data = getDataHelper(bytes.length, bytes);
						for (i = 0; i < fileslength; i++) {
							entry = new Entry();
							entry._worker = worker;
							if (data.view.getUint32(index) != 0x504b0102) {
								onerror(ERR_BAD_FORMAT);
								return;
							}
							readCommonHeader(entry, data, index + 6, true, onerror);
							entry.commentLength = data.view.getUint16(index + 32, true);
							entry.directory = ((data.view.getUint8(index + 38) & 0x10) == 0x10);
							entry.offset = data.view.getUint32(index + 42, true);
							filename = getString(data.array.subarray(index + 46, index + 46 + entry.filenameLength));
							entry.filename = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(filename) : decodeASCII(filename);
							if (!entry.directory && entry.filename.charAt(entry.filename.length - 1) == "/")
								entry.directory = true;
							comment = getString(data.array.subarray(index + 46 + entry.filenameLength + entry.extraFieldLength, index + 46
									+ entry.filenameLength + entry.extraFieldLength + entry.commentLength));
							entry.comment = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(comment) : decodeASCII(comment);
							entries.push(entry);
							index += 46 + entry.filenameLength + entry.extraFieldLength + entry.commentLength;
						}
						callback(entries);
					}, function() {
						onerror(ERR_READ);
					});
				});
			},
			close : function(callback) {
				if (this._worker) {
					this._worker.terminate();
					this._worker = null;
				}
				if (callback)
					callback();
			},
			_worker: null
		};

		if (!obj.zip.useWebWorkers)
			callback(zipReader);
		else {
			createWorker('inflater',
				function(worker) {
					zipReader._worker = worker;
					callback(zipReader);
				},
				function(err) {
					onerror(err);
				}
			);
		}
	}