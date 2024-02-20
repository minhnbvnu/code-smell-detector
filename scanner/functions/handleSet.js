function handleSet(setObj) {
        var item = setObj.functionName;
        var esr = setObj.parentObj;
        var clss = setObj.parentName;
        var val;
        var fn = item.replace(/^set/, 'get');
        if(editor.menuOptions[item] !== undefined) {
            elements.push(makeDropdown(item, esr, clss, fn));
        } else if(typeof esr[fn] === 'function') {
            try {
                val = esr[fn]();
                if(typeof val === 'object') {
                    val = val.$id;
                }
                elements.push(
                    createNewEntry(esr, clss, item, val)
                );
            } catch (e) {
            }
        }
    }