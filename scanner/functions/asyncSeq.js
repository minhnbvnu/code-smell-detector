function asyncSeq(success) {
    var args = Array.prototype.slice.call(arguments, 1);
    var finish = asyncFinish(args.length, success);
    for (var i = 0; i < args.length; ++i) {
        args[i](finish);
    }
}