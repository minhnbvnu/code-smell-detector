function makeDropdown(item, esr, clss, fn) {
        var val = editor.menuOptions[item];
        var currentVal = esr[fn]();
        if (typeof currentVal == 'object')
            currentVal = currentVal.$id;
        val.forEach(function(valuex) {
            if (valuex.value === currentVal)
                valuex.selected = 'selected';
        });
        return createNewEntry(esr, clss, item, val);
    }