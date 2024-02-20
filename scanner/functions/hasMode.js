function hasMode(mode) {
        if (mode) {
            var modes = CodeMirror.listModes();

            for (var i in modes) {
                if (modes[i] == mode) {
                    return true;
                }
            }
        }

        return false;
    }