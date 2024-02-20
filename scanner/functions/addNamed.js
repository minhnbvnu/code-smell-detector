function addNamed(name, key, val, noName) {
        noName = noName || false;
        if (noName) { name = ""; }

        if (!key || key.length === 0)  {
            key = name;
        }
        return key + (key.length > 0 ? "=" : "") + val;
    }