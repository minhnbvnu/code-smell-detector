function readChunk(n) {
				self.chunks.push(self.buffer.slice(i, i + n));
				i += n;
			}