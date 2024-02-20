function writeFooter(compressedLength, crc32) {
					var footer = getDataHelper(16);
					datalength += compressedLength || 0;
					footer.view.setUint32(0, 0x504b0708);
					if (typeof crc32 != "undefined") {
						header.view.setUint32(10, crc32, true);
						footer.view.setUint32(4, crc32, true);
					}
					if (reader) {
						footer.view.setUint32(8, compressedLength, true);
						header.view.setUint32(14, compressedLength, true);
						footer.view.setUint32(12, reader.size, true);
						header.view.setUint32(18, reader.size, true);
					}
					writer.writeUint8Array(footer.array, function() {
						datalength += 16;
						onend();
					}, onwriteerror);
				}