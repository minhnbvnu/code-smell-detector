function _catches(description, path, _mode) {
        it(`catches ${description} paths (${_mode ? _mode : 'default'})`, function() {
            row.text = `${path}${_mode}`;
            const context = row.get_style_context();

            expect(context.has_class(validity.VALID)).toBe(false);
            expect(context.has_class(validity.NOTVALID)).toBe(true);
        });
    }