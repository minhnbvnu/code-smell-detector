function outputBraket(_a, star1, star2) {
        var _b = __read(_a, 3), arg1 = _b[0], arg2 = _b[1], arg3 = _b[2];
        return (star1 && star2) ?
            "\\left\\langle{".concat(arg1, "}\\middle\\vert{").concat(arg2, "}\\middle\\vert{").concat(arg3, "}\\right\\rangle") :
            (star1 ? "\\langle{".concat(arg1, "}\\vert{").concat(arg2, "}\\vert{").concat(arg3, "}\\rangle") :
                "\\left\\langle{".concat(arg1, "}\\right\\vert{").concat(arg2, "}\\left\\vert{").concat(arg3, "}\\right\\rangle"));
    }