function do_safe() {
        if (option.adsafe) {
            option.safe = true;
        }
        if (option.safe) {
            option.browser     =
                option['continue'] =
                option.css     =
                option.debug   =
                option.devel   =
                option.evil    =
                option.forin   =
                option.newcap  =
                option.nomen   =
                option.on      =
                option.rhino   =
                option.sloppy  =
                option.sub     =
                option.undef   =
                option.widget  =
                option.windows = false;


            delete predefined.Array;
            delete predefined.Date;
            delete predefined.Function;
            delete predefined.Object;
            delete predefined['eval'];

            add_to_predefined({
                ADSAFE: false,
                lib: false
            });
        }
    }