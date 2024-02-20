function defineArgumentsExtended(extended, is) {

        var pSlice = Array.prototype.slice,
            isArguments = is.isArguments;

        function argsToArray(args, slice) {
            var i = -1, j = 0, l = args.length, ret = [];
            slice = slice || 0;
            i += slice;
            while (++i < l) {
                ret[j++] = args[i];
            }
            return ret;
        }


        return extended
            .define(isArguments, {
                toArray: argsToArray
            })
            .expose({
                argsToArray: argsToArray
            });
    }