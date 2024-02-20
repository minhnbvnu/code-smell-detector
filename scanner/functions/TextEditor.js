function TextEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
            $input = $("<INPUT type=text class='editor-text' />")
                .appendTo(args.container)
                .on("keydown.nav", navOnLR ? handleKeydownLRNav : handleKeydownLRNoNav)
                .focus()
                .select();
            // don't show Save/Cancel when it's a Composite Editor and also trigger a onCompositeEditorChange event when input changes
            if (args.compositeEditorOptions) {
                $input.on("change", function () {
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
            $input.remove();
        };
        this.focus = function () {
            $input.focus();
        };
        this.getValue = function () {
            return $input.val();
        };
        this.setValue = function (val) {
            $input.val(val);
        };
        this.loadValue = function (item) {
            defaultValue = item[args.column.field] || "";
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };
        this.serializeValue = function () {
            return $input.val();
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
        };
        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val(), args);
                if (!validationResults.valid) {
                    return validationResults;
                }
            }
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }