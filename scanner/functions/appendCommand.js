function appendCommand(args) {
        var cmdStr = args.cmd;
        for (var n in args) {
            if (n != 'cmd') {
                cmdStr += ' ' + n;
                if (Math.round(args[n]).toString() == args[n].toString())
                    cmdStr += (n + '.0');
                else
                    cmdStr += n.toString();
            }
        }
    }