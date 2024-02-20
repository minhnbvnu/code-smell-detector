function switchLoader(clientName) {
    Java.perform(function () {
        if ("" != clientName) {
            try {
                var clz = Java.classFactory.loader.findClass(clientName)
                console.log("")
                console.log(">>>>>>>>>>>>>  ", clz, "  <<<<<<<<<<<<<<<<")
            } catch (error) {
                console.log(error)
                Java.enumerateClassLoaders({
                    onMatch: function (loader) {
                        try {
                            if (loader.findClass(clientName)) {
                                Java.classFactory.loader = loader
                                console.log("")
                                console.log("Switch ClassLoader To : ", loader)
                                console.log("")
                            }
                        } catch (error) {
                            // console.log(error)
                        }
                    },
                    onComplete: function () {
                        console.log("")
                        console.log("Switch ClassLoader Complete !")
                        console.log("")
                    }
                })
            }
        }
		Java.openClassFile("/data/local/tmp/okhttpfind.dex").load()
    })
}