function CheckboxEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
            $select.appendTo(args.container);
            $select.focus();
            // trigger onCompositeEditorChange event when input checkbox changes and it's a Composite Editor
            if (args.compositeEditorOptions) {
                $select.on("change", function () {
                    var activeCell = args.grid.getActiveCell();
                    // when valid, we'll also apply the new value to the dataContext item object
                    if (scope.validate().valid) {
                        scope.applyValue(scope.args.item, scope.serializeValue());
                    }
                    scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                    args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                });
            }
        };
        this.destroy = function () {
            $select.remove();
        };
        this.focus = function () {
            $select.focus();
        };
        this.loadValue = function (item) {
            defaultValue = !!item[args.column.field];
            if (defaultValue) {
                $select.prop('checked', true);
            }
            else {
                $select.prop('checked', false);
            }
        };
        this.preClick = function () {
            $select.prop('checked', !$select.prop('checked'));
        };
        this.serializeValue = function () {
            return $select.prop('checked');
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (this.serializeValue() !== defaultValue);
        };
        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }