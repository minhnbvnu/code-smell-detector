function asMediaQuery(ctx) {
        var filenameWithProtocol = ctx.debugInfo.fileName;
        if (!/^[a-z]+:\/\//i.test(filenameWithProtocol)) {
            filenameWithProtocol = "file://" + filenameWithProtocol;
        }
        return "@media -sass-debug-info{filename{font-family:" + filenameWithProtocol.replace(/([.:\/\\])/g, function (a) {
            if (a == '\\') {
                a = '\/';
            }
            return "\\" + a;
        }) + "}line{font-family:\\00003" + ctx.debugInfo.lineNumber + "}}\n";
    }