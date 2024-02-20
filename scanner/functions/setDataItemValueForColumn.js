function setDataItemValueForColumn(item, columnDef, value) {
            if (columnDef.denyPaste) {
                return null;
            }
            if (_options.dataItemColumnValueSetter) {
                return _options.dataItemColumnValueSetter(item, columnDef, value);
            }
            // if a custom setter is not defined, we call applyValue of the editor to unserialize
            if (columnDef.editor) {
                var editorArgs = {
                    'container': $("body"),
                    'column': columnDef,
                    'position': { 'top': 0, 'left': 0 },
                    'grid': _grid
                };
                var editor = new columnDef.editor(editorArgs);
                editor.loadValue(item);
                editor.applyValue(item, value);
                editor.destroy();
            }
            else {
                item[columnDef.field] = value;
            }
        }