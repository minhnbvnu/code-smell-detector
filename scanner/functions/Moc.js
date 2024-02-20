function Moc(mocBytes) {
            // Allocate memory.
            var memory = _csm.mallocMoc(mocBytes.byteLength);
            if (!memory) {
                return;
            }
            // Initialize memory.
            var destination = new Uint8Array(_em.HEAPU8.buffer, memory, mocBytes.byteLength);
            destination.set(new Uint8Array(mocBytes));
            // Revive moc.
            this._ptr = _csm.reviveMocInPlace(memory, mocBytes.byteLength);
            if (!this._ptr) {
                _csm.free(memory);
            }
        }