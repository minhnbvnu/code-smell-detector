function getDecimalPlaces() {
            // returns the number of fixed decimal places or null
            var rtn = args.column.editorFixedDecimalPlaces;
            if (typeof rtn == 'undefined') {
                rtn = FloatEditor.DefaultDecimalPlaces;
            }
            return (!rtn && rtn !== 0 ? null : rtn);
        }