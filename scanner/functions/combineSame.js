function combineSame(name) {
        var e_4, _a;
        var children = __spreadArray([], __read(Styles.connect[name].children), false);
        var value = this.styles[this.childName(name, children.shift())];
        try {
            for (var children_2 = __values(children), children_2_1 = children_2.next(); !children_2_1.done; children_2_1 = children_2.next()) {
                var child = children_2_1.value;
                if (this.styles[this.childName(name, child)] !== value) {
                    delete this.styles[name];
                    return;
                }
            }
        }
        catch (e_4_1) {
            e_4 = { error: e_4_1 };
        }
        finally {
            try {
                if (children_2_1 && !children_2_1.done && (_a = children_2.return))
                    _a.call(children_2);
            }
            finally {
                if (e_4)
                    throw e_4.error;
            }
        }
        this.styles[name] = value;
    }