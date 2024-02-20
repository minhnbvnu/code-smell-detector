function readCommonHeader(entry, data, index, centralDirectory, onerror) {
		entry.version = data.view.getUint16(index, true);
		entry.bitFlag = data.view.getUint16(index + 2, true);
		entry.compressionMethod = data.view.getUint16(index + 4, true);
		entry.lastModDateRaw = data.view.getUint32(index + 6, true);
		entry.lastModDate = getDate(entry.lastModDateRaw);
		if ((entry.bitFlag & 0x01) === 0x01) {
			onerror(ERR_ENCRYPTED);
			return;
		}
		if (centralDirectory || (entry.bitFlag & 0x0008) != 0x0008) {
			entry.crc32 = data.view.getUint32(index + 10, true);
			entry.compressedSize = data.view.getUint32(index + 14, true);
			entry.uncompressedSize = data.view.getUint32(index + 18, true);
		}
		if (entry.compressedSize === 0xFFFFFFFF || entry.uncompressedSize === 0xFFFFFFFF) {
			onerror(ERR_ZIP64);
			return;
		}
		entry.filenameLength = data.view.getUint16(index + 22, true);
		entry.extraFieldLength = data.view.getUint16(index + 24, true);
	}