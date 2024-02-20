function readUint8Array(index, length, callback, onerror) {
			callback(new Uint8Array(arrayBuffer.slice(index, index + length)));
		}