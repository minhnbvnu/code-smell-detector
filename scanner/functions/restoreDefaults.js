function restoreDefaults(e) {
        e.preventDefault();

        getInputs().forEach(function(input) {
            var value = defaults[input.name];

            localStorage[input.name] = value;
            _setInputValue(input, value);
        });

        showMessage('settings have been restored to the defaults');
    }