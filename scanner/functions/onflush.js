function onflush() {
			worker.removeEventListener('message', onmessage, false);
			onend(outputSize, crc);
		}