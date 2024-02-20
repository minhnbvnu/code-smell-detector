function _setInputValue(input, value) {
        if (input.type === 'checkbox') {
            input.checked = value && value !== 'false';
            return;
        }

        if (input.type === 'color' && !/#\d{6}/.test(value)) {
            value = defaults[input.name];
        }

        input.value = value;
    }