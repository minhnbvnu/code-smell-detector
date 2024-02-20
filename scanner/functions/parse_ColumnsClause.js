function parse_ColumnsClause() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_All();
                if (result0 === null) {
                    result0 = parse_Fields();
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, arr) {
                        var aliasCount = 0;
                        for(var i = 0; i < arr.length; i++) {
                            if(arr[i].alias) {
                                aliasCount++;
                            }
                        }
                        if(aliasCount > 0 && aliasCount != arr.length) {
                            throw new this.SyntaxError("Line " + line + ": Not all selected columns are using aliases.");
                        }
                        return arr;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }