function clearBy() {
            var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function() {
                return true
            };
            return {
                type: CLEAR_BY,
                payload: filter
            }
        }