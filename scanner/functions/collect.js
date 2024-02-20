function collect(arr, separator, ret, f) {
                for(var i = 0; i < arr.length; i++) {
                    if(typeOf(arr[i]) == 'array') {
                        collect(arr[i], separator, ret, f);
                    }
                    else if(arr[i] != "" && arr[i] != separator) {
                        if(f && arr[i][f]) {
                            ret.push(arr[i][f]);
                        }
                        else {
                            ret.push(arr[i]);
                        }
                    }
                }
            }