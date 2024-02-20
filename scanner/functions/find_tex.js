function find_tex(text) {
        const find_text = new FindTeX_js_1.FindTeX({
            processEnvironments: false,
            processEscapes: false,
            processRefs: false,
        });
        return find_text.findMath([text]);
    }