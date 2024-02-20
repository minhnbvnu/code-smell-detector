function syncSeq(success) {
    var args = Array.prototype.slice.call(arguments, 1);
    var finish = asyncFinish(1, success);
    var l = args.length;
    var tmp = curry(args[l-1], finish);
    for (var i = l-2; i >= 0; --i)
        tmp = curry(args[i], tmp);
    tmp();
}