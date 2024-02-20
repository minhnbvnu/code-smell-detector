function asyncFinish(total, success) {
    var cnt = 0;
    $("#loading").show();
    return function() {
        cnt++;
        if (cnt == total) {
            $("#loading").hide();
            if (typeof success == "function")
                success();
        }
    }
}