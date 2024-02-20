function callDefMain(args, context) {
        main.apply(req, args);
        //Mark the module loaded. Must do it here in addition
        //to doing it in require.def in case a script does
        //not call require.def
        context.loaded[args[0]] = true;
    }