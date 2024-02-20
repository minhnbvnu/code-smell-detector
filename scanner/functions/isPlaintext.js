function isPlaintext(byteString) {
    try {
        var bufferSize = byteString.size()
        var buffer = NewBuffer(byteString)
        for (var i = 0; i < 16; i++) {
            if (bufferSize == 0) {
                console.log("bufferSize == 0")
                break
            }
            var codePoint = buffer.readUtf8CodePoint()
            if (CharacterWapper.isISOControl(codePoint) && !CharacterWapper.isWhitespace(codePoint)) {
                return false;
            }
        }
        return true;
    } catch (error) {
        // console.log(error)
        // console.log(Java.use("android.util.Log").getStackTraceString(error))
        return false;
    }
}