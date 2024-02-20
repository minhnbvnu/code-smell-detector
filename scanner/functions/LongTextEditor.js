function LongTextEditor(args) {
        var $input, $wrapper;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            var compositeEditorOptions = args.compositeEditorOptions;
            var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
            var $container = compositeEditorOptions ? args.container : $('body');
            $wrapper = $("<DIV class='slick-large-editor-text' style='z-index:10000;background:white;padding:5px;border:3px solid gray; border-radius:10px;'/>")
                .appendTo($container);
            if (compositeEditorOptions) {
                $wrapper.css({ position: 'relative', padding: 0, border: 0 });
            }
            else {
                $wrapper.css({ position: 'absolute' });
            }
            $input = $("<TEXTAREA hidefocus rows=5 style='background:white;width:250px;height:80px;border:0;outline:0'>")
                .appendTo($wrapper);
            // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
            if (compositeEditorOptions) {
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
            else {
                $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
                    .appendTo($wrapper);
                $wrapper.find("button:first").on("click", this.save);
                $wrapper.find("button:last").on("click", this.cancel);
                $input.on("keydown", this.handleKeyDown);
                scope.position(args.position);
            }
            $input.focus().select();
        };
        this.handleKeyDown = function (e) {
            if (e.which == Slick.keyCode.ENTER && e.ctrlKey) {
                scope.save();
            }
            else if (e.which == Slick.keyCode.ESCAPE) {
                e.preventDefault();
                scope.cancel();
            }
            else if (e.which == Slick.keyCode.TAB && e.shiftKey) {
                e.preventDefault();
                args.grid.navigatePrev();
            }
            else if (e.which == Slick.keyCode.TAB) {
                e.preventDefault();
                args.grid.navigateNext();
            }
            else if (e.which == Slick.keyCode.LEFT || e.which == Slick.keyCode.RIGHT) {
                if (args.grid.getOptions().editorCellNavOnLRKeys) {
                    var cursorPosition = this.selectionStart;
                    var textLength = this.value.length;
                    if (e.keyCode === Slick.keyCode.LEFT && cursorPosition === 0) {
                        args.grid.navigatePrev();
                    }
                    if (e.keyCode === Slick.keyCode.RIGHT && cursorPosition >= textLength - 1) {
                        args.grid.navigateNext();
                    }
                }
            }
        };
        this.save = function () {
            args.commitChanges();
        };
        this.cancel = function () {
            $input.val(defaultValue);
            args.cancelChanges();
        };
        this.hide = function () {
            $wrapper.hide();
        };
        this.show = function () {
            $wrapper.show();
        };
        this.position = function (position) {
            $wrapper
                .css("top", position.top - 5)
                .css("left", position.left - 5);
        };
        this.destroy = function () {
            $wrapper.remove();
        };
        this.focus = function () {
            $input.focus();
        };
        this.loadValue = function (item) {
            $input.val(defaultValue = item[args.column.field]);
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