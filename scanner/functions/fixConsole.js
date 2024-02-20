function fixConsole(txt) {
        txt = _.escape(txt);

        // color ansi codes (and remove non-color escape sequences)
        txt = _ansispan(txt);
        return txt;
    }