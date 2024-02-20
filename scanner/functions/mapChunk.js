function mapChunk(chunkId, mapper) {
        var chunk = riff.findChunk(chunkId);
        return chunk == null ? null : mapper(chunk);
    }