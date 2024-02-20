function hold() {
    Java.perform(function () {
        //
        Utils = Java.use("com.singleman.okhttp.Utils")
        //Init common
        JavaStringWapper = Java.use("java.lang.String")
        JavaStringBufferWapper = Java.use("java.lang.StringBuilder")
        JavaIntegerWapper = Java.use("java.lang.Integer")
        GsonWapper = Java.use("com.singleman.gson.Gson")
        ListWapper = Java.use("java.util.List")
        ArraysWapper = Java.use("java.util.Arrays")
        ArrayListWapper = Java.use("java.util.ArrayList")
        CharsetWapper = Java.use("java.nio.charset.Charset")
        CharacterWapper = Java.use("java.lang.Character")

        OkioByteStrngWapper = Java.use("com.singleman.okio.ByteString")
        OkioBufferWapper = Java.use("com.singleman.okio.Buffer")

        //Init OKHTTP
        OkHttpClientWapper = Java.use(Cls_OkHttpClient)
        ResponseBodyWapper = Java.use(Cls_ResponseBody)
        BufferWapper = Java.use(Cls_okio_Buffer)

        //Start Hook
        OkHttpClientWapper[M_Client_newCall].overload(Cls_Request).implementation = function (request) {
            var call = this[M_Client_newCall](request)
            try {
                CallCache.push(call["clone"]())
            } catch (error) {
                console.log("not fount clone method!")
            }
            var realCallClassName = call.$className
            if (!alreadyHook(realCallClassName)) {
                hookedArray.push(realCallClassName)
                hookRealCall(realCallClassName)
            }
            return call;
        }
    })
}