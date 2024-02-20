function emitChunk(force) {
            var len = chunkerCurrentIndex - emitFrom;
            if (((len < 512) && !force) || !len) {
                return;
            }
            chunks.push(input.slice(emitFrom, chunkerCurrentIndex + 1));
            emitFrom = chunkerCurrentIndex + 1;
        }