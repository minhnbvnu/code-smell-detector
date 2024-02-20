function combineTRBL(name) {
        var e_2, _a;
        var children = Styles.connect[name].children;
        var parts = [];
        try {
            for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                var child = children_1_1.value;
                var part = this.styles[name + '-' + child];
                if (!part) {
                    delete this.styles[name];
                    return;
                }
                parts.push(part);
            }
        }
        catch (e_2_1) {
            e_2 = { error: e_2_1 };
        }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return))
                    _a.call(children_1);
            }
            finally {
                if (e_2)
                    throw e_2.error;
            }
        }
        if (parts[3] === parts[1]) {
            parts.pop();
            if (parts[2] === parts[0]) {
                parts.pop();
                if (parts[1] === parts[0]) {
                    parts.pop();
                }
            }
        }
        this.styles[name] = parts.join(' ');
    }