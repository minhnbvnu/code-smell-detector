function FloatEditor(args) {
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
            // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
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
        function getDecimalPlaces() {
            // returns the number of fixed decimal places or null
            var rtn = args.column.editorFixedDecimalPlaces;
            if (typeof rtn == 'undefined') {
                rtn = FloatEditor.DefaultDecimalPlaces;
            }
            return (!rtn && rtn !== 0 ? null : rtn);
        }
        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            var decPlaces = getDecimalPlaces();
            if (decPlaces !== null
                && (defaultValue || defaultValue === 0)
                && defaultValue.toFixed) {
                defaultValue = defaultValue.toFixed(decPlaces);
            }
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };
        this.serializeValue = function () {
            var rtn = parseFloat($input.val());
            if (FloatEditor.AllowEmptyValue) {
                if (!rtn && rtn !== 0) {
                    rtn = '';
                }
            }
            else {
                rtn = rtn || 0;
            }
            var decPlaces = getDecimalPlaces();
            if (decPlaces !== null
                && (rtn || rtn === 0)
                && rtn.toFixed) {
                rtn = parseFloat(rtn.toFixed(decPlaces));
            }
            return rtn;
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
        };
        this.validate = function () {
            if (isNaN($input.val())) {
                return {
                    valid: false,
                    msg: "Please enter a valid number"
                };
            }
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