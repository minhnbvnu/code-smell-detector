function setoptionsConfig(_config, jax) {
        var require = jax.parseOptions.handlers.get('macro').lookup('require');
        if (require) {
            setOptionsMap.add('Require', new Symbol_js_1.Macro('Require', require._func));
            setOptionsMap.add('require', new Symbol_js_1.Macro('require', BaseMethods_js_1.default.Macro, ['\\Require{#2}\\setOptions[#2]{#1}', 2, '']));
        }
    }