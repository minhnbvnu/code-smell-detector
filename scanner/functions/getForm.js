function getForm(node) {
            var e_3, _a;
            if (!isType(node, 'mo')) {
                return null;
            }
            var mo = node;
            var forms = mo.getForms();
            try {
                for (var forms_1 = __values(forms), forms_1_1 = forms_1.next(); !forms_1_1.done; forms_1_1 = forms_1.next()) {
                    var form = forms_1_1.value;
                    var symbol = mo_js_1.MmlMo.OPTABLE[form][mo.getText()];
                    if (symbol) {
                        return symbol;
                    }
                }
            }
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (forms_1_1 && !forms_1_1.done && (_a = forms_1.return))
                        _a.call(forms_1);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
            }
            return null;
        }