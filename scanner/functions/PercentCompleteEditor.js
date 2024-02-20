function PercentCompleteEditor(args) {
        var $input, $picker;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            $input = $("<INPUT type=text class='editor-percentcomplete' />");
            $input.width($(args.container).innerWidth() - 25);
            $input.appendTo(args.container);
            $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
            $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");
            $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");
            $input.focus().select();
            $picker.find(".editor-percentcomplete-slider").slider({
                orientation: "vertical",
                range: "min",
                value: defaultValue,
                slide: function (event, ui) {
                    $input.val(ui.value);
                },
                stop: function (event, ui) {
                    // trigger onCompositeEditorChange event when slider stops and it's a Composite Editor
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
            $picker.find(".editor-percentcomplete-buttons button").on("click", function (e) {
                $input.val($(this).attr("val"));
                $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
            });
        };
        this.destroy = function () {
            $input.remove();
            $picker.remove();
        };
        this.focus = function () {
            $input.focus();
        };
        this.loadValue = function (item) {
            $input.val(defaultValue = item[args.column.field]);
            $input.select();
        };
        this.serializeValue = function () {
            return parseInt($input.val(), 10) || 0;
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
        };
        this.validate = function () {
            if (isNaN(parseInt($input.val(), 10))) {
                return {
                    valid: false,
                    msg: "Please enter a valid positive number"
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }