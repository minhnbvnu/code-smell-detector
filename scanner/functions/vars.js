function vars(stream) {
                var arr = [];
                for(var i = 0; i < stream.length; i++) {
                    var ele = stream[i];
                    if(ele.constructor !== String) {
                        if(ele.variable.constructor == Array) {
                            // Case of nested token - only single valued for now
                            arr = arr.concat(vars(ele.variable));
                        }
                        arr.push(ele.str);
                    }
                }
                return arr;
            }