function parseAni(arr) {
    var riff = new riff_file_1.RIFFFile();
    riff.setSignature(arr);
    var signature = riff.signature;
    if (signature.format !== "ACON") {
        throw new Error("Expected format. Expected \"ACON\", got \"" + signature.format + "\"");
    }
    // Helper function to get a chunk by chunkId and transform it if it's non-null.
    function mapChunk(chunkId, mapper) {
        var chunk = riff.findChunk(chunkId);
        return chunk == null ? null : mapper(chunk);
    }
    var metadata = mapChunk("anih", function (c) {
        var words = byte_data_1.unpackArray(arr, DWORD, c.chunkData.start, c.chunkData.end);
        return {
            cbSize: words[0],
            nFrames: words[1],
            nSteps: words[2],
            iWidth: words[3],
            iHeight: words[4],
            iBitCount: words[5],
            nPlanes: words[6],
            iDispRate: words[7],
            bfAttributes: words[8],
        };
    });
    if (metadata == null) {
        throw new Error("Did not find anih");
    }
    var rate = mapChunk("rate", function (c) {
        return byte_data_1.unpackArray(arr, DWORD, c.chunkData.start, c.chunkData.end);
    });
    // chunkIds are always four chars, hence the trailing space.
    var seq = mapChunk("seq ", function (c) {
        return byte_data_1.unpackArray(arr, DWORD, c.chunkData.start, c.chunkData.end);
    });
    var lists = riff.findChunk("LIST", true);
    var imageChunk = lists === null || lists === void 0 ? void 0 : lists.find(function (c) { return c.format === "fram"; });
    if (imageChunk == null) {
        throw new Error("Did not find fram LIST");
    }
    var images = imageChunk.subChunks.slice(0, metadata.nFrames).map(function (c) {
        if (c.chunkId !== "icon") {
            throw new Error("Unexpected chunk type in fram: " + c.chunkId);
        }
        return arr.slice(c.chunkData.start, c.chunkData.end);
    });
    var title = null;
    var artist = null;
    var infoChunk = lists === null || lists === void 0 ? void 0 : lists.find(function (c) { return c.format === "INFO"; });
    if (infoChunk != null) {
        infoChunk.subChunks.forEach(function (c) {
            switch (c.chunkId) {
                case "INAM":
                    title = byte_data_1.unpackString(arr, c.chunkData.start, c.chunkData.end);
                    break;
                case "IART":
                    artist = byte_data_1.unpackString(arr, c.chunkData.start, c.chunkData.end);
                    break;
                default:
                // Unexpected subchunk
            }
        });
    }
    return { images: images, rate: rate, seq: seq, metadata: metadata, artist: artist, title: title };
}