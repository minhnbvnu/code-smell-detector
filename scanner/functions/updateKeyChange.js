function updateKeyChange(name, val) {
        fireEvent(name, val);
        if(name == "space" || name == "enter") {
            updateKeyChange("action", val)
        }
        if (that.keyboard[name] !== val) {
            that.keyboard[name] = val;
            that.keyboardChange[name] = val;
        }
    }