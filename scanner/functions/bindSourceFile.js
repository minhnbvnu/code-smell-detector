function bindSourceFile(file, options) {
            mark("beforeBind");
            perfLogger.logStartBindFile("" + file.fileName);
            binder(file, options);
            perfLogger.logStopBindFile();
            mark("afterBind");
            measure("Bind", "beforeBind", "afterBind");
        }