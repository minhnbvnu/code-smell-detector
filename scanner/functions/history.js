function history() {
    Java.perform(function () {
        try {
            console.log("")
            console.log("History Size : " + CallCache.length)
            for (var i = 0; i < CallCache.length; i++) {
                var call = CallCache[i]
                if ("" != M_Call_request) {
                    console.log("-----> index[" + i + "]" + " >> " + call[M_Call_request]())
                } else {
                    console.log("-----> index[" + i + "]" + "    ????  M_Call_execute = \"\"")
                }
                console.log("")
            }
            console.log("")
        } catch (error) {
            console.log(error)
        }
    })
}