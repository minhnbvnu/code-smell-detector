function _handles(description, path, _mode) {
        it(`handles ${description} paths (${_mode ? _mode : 'default'})`, function() {
            row.text = `${path}${_mode}`;
            const context = row.get_style_context();

            expect(context.has_class(validity.VALID)).toBe(true);
            expect(context.has_class(validity.NOTVALID)).toBe(false);
        });
    }