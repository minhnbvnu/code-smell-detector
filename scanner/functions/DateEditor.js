function DateEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        var calendarOpen = false;
        this.args = args;
        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />");
            $input.appendTo(args.container);
            $input.focus().select();
            $input.datepicker({
                showOn: "button",
                buttonImageOnly: true,
                beforeShow: function () {
                    calendarOpen = true;
                },
                onClose: function () {
                    calendarOpen = false;
                    // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
                    if (args.compositeEditorOptions) {
                        var activeCell = args.grid.getActiveCell();
                        // when valid, we'll also apply the new value to the dataContext item object
                        if (scope.validate().valid) {
                            scope.applyValue(scope.args.item, scope.serializeValue());
                        }
                        scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                        args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                    }
                }
            });
            $input.width($input.width() - (!args.compositeEditorOptions ? 18 : 28));
        };
        this.destroy = function () {
            $.datepicker.dpDiv.stop(true, true);
            $input.datepicker("hide");
            $input.datepicker("destroy");
            $input.remove();
        };
        this.show = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).show();
            }
        };
        this.hide = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).hide();
            }
        };
        this.position = function (position) {
            if (!calendarOpen) {
                return;
            }
            $.datepicker.dpDiv
                .css("top", position.top + 30)
                .css("left", position.left);
        };
        this.focus = function () {
            $input.focus();
        };
        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
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